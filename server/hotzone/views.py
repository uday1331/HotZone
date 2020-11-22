from .models import Location, Patient, Case
from .serializers import LocationSerializer, PatientSerializer, CaseSerializer

from rest_framework import generics, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

import requests as req
import urllib.parse

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
