from rest_framework import serializers
from .models import Location, Patient

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'x_coord', 'y_coord', 'name', 'address']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['hkid', 'name', 'dob']