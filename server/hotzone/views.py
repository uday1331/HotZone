from .models import Location, Patient, Case, Visit
from .serializers import LocationSerializer, PatientSerializer, CaseSerializer, VisitSerializer

from rest_framework import generics, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

import requests as req
import urllib.parse

# Packages for clustering
import numpy as np
from sklearn.cluster import DBSCAN
import math
from datetime import date

def geoDataToLocationModel(geo_data):
    location_data = {}
    location_data['x_coord'] = geo_data.get('x')
    location_data['y_coord'] = geo_data.get('y')
    location_data['address'] = geo_data.get('addressEN')
    location_data['name'] = geo_data.get('nameEN')
    
    return location_data

class LocationDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationSearchFromGeoData(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, name):
        query_location_name = name
        geo_data_response = req.get(
            'https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='+ 
            urllib.parse.quote(query_location_name)
        )
        if(not geo_data_response):
           return Response(
               "GeoData pertaining to '" + 
                query_location_name + "' not found.", 
                status=status.HTTP_400_BAD_REQUEST
            )  

        data = geo_data_response.json()
        location_data = list(map(geoDataToLocationModel, data))

        serializer = LocationSerializer(data=location_data, many=True)
        if serializer.is_valid():
            return Response(location_data[:10], status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LocationList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def create(self, request):
        exists = Location.objects.filter(
            name = request.data.get('name'), 
            x_coord = request.data.get('x_coord'),
            y_coord = request.data.get('y_coord')
        ).count()
        if(exists):
            return Response(
                "Location Data pertaining to '" + 
                request.data.get('name') + 
                "' exists in hotzone.", 
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VisitList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = VisitSerializer

    def get_queryset(self):
        case_id = self.request.query_params.get('case', None)
        queryset = Visit.objects.all()

        if case_id is not None:
            queryset = queryset.filter(case=case_id)
        
        return queryset

    def create(self, request):
        data = request.data
        serializer = VisitSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class CasesList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class CaseOne(generics.RetrieveAPIView):
    def get(self, request, case_no):
        queryset = Case.objects.filter(case_no=case_no)
        serializer = CaseSerializer(queryset, many=True)

        return Response(serializer.data[0], status=status.HTTP_200_OK)

class ChangePassword(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        try:
            new_password = request.data.get("new_password")
            auth_header = request.META['HTTP_AUTHORIZATION']
            token = auth_header.split(" ")[1]
            user = Token.objects.get(key=token).user
            user.set_password(new_password)
            user.save()
            return Response (
                "password changed successfully",
                status=status.HTTP_200_OK
            )
        except:
            return Response (
                "failed to reset password",
                status=status.HTTP_400_BAD_REQUEST
            )

class ClustersList(APIView):
    permission_classes = (IsAuthenticated, )

    def custom_metric(self, q, p, space_eps, time_eps):
        dist = 0
        for i in range(2):
            dist += (q[i] - p[i]) ** 2
        spatial_dist = math.sqrt(dist)

        time_dist = math.sqrt((q[2] - p[2]) ** 2)

        if time_dist/time_eps <= 1 and spatial_dist/space_eps <= 1 and p[3] != q[3]:    
            return 1
        else:
            return 2

    # The fact that this logic is here breaks MVC...
    # But it's okay for this final sprint, I think.
    # I would put this in models.py, but we have the
    # baggage of Django here.
    def cluster(self, vector_4d, distance, time, minimum_cluster):
        params = {"space_eps": distance, "time_eps": time}
        db = DBSCAN(eps=1, min_samples=minimum_cluster-1, metric=self.custom_metric, metric_params=params).fit_predict(vector_4d)

        unique_labels = set(db)
        total_clusters = len(unique_labels) if -1 not in unique_labels else len(unique_labels) - 1
        total_noise = list(db).count(-1)

        clusters = dict()
        for k in unique_labels:
            if k != -1:
                labels_k = db == k
                cluster_k = vector_4d[labels_k]

                cluster_cases = []
                cluster_locations = set()
                for pt in cluster_k:
                    case = {
                        'x': pt[0],
                        'y': pt[1],
                        'day': int(pt[2]),
                        'caseNo': int(pt[3]),
                    }
                    cluster_cases.append(case)

                    # Add location info back into cluster for intuitive display in frontend
                    queryset = Location.objects.values('name').get(x_coord__exact=case['x'], y_coord__exact=case['y'])
                    location = dict(queryset)['name']
                    cluster_locations.add(location)

                clusters[str(k)] = {
                    'cases': cluster_cases,
                    'locations_involved': list(cluster_locations)
                }
        
        return clusters

    def get(self, request):
        # Get query parameters
        distance = int(request.GET.get('distance', 200))
        time = int(request.GET.get('time', 3))
        minimum_cluster = int(request.GET.get('minimum_cluster', 2))

        queryset = Visit.objects.values('location__x_coord', 'location__y_coord', 'date_from', 'case')
        visits = list(queryset)

        DAY_ZERO = date(2020, 1, 1)

        # Massage data for clustering
        np_array = []
        for visit in visits:
            raw_date = visit['date_from']

            # Number of days from DAY_ZERO (as specified in Sprint 3 tasksheet)
            days = (raw_date - DAY_ZERO).days
            vector_4d = [visit['location__x_coord'], visit['location__y_coord'], days, visit['case']]
            np_array.append(vector_4d)

        np_array = np.array(np_array)
        
        clusters = self.cluster(np_array, distance, time, minimum_cluster)

        return Response(clusters, status=status.HTTP_200_OK)
