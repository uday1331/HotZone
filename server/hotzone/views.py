from .models import Location
from .serializers import LocationSerializer

from rest_framework import generics, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

import requests as req
import urllib.parse



class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def create(self, request):
        input_name = request.data.get('name')

        geo_data_response = req.get('https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q=' + urllib.parse.quote(input_name))
        data = geo_data_response.json()

        location_data = {}
        location_data['x_coord'] = data[0].get('x')
        location_data['y_coord'] = data[0].get('y')
        location_data['address'] = data[0].get('addressEN')
        location_data['name'] = data[0].get('nameEN')

        serializer = LocationSerializer(data=location_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer