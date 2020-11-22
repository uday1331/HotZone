from rest_framework import serializers
from .models import Location, Visit, Patient, Virus, Case

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'x_coord', 'y_coord', 'name', 'address']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['hkid', 'name', 'dob']

class VisitSerializer(serializers.ModelSerializer):
    location = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Visit
        fields = ['case', 'location', 'date_from', 'date_to', 'category']

    def to_representation(self, value):
        data = super().to_representation(value)
        location_serializer = LocationSerializer(value.location)
        data['location'] = location_serializer.data
        return data

class VirusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Virus
        fields = ['name', 'disease', 'max_infectious']

class CaseSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(read_only=True)
    virus = serializers.PrimaryKeyRelatedField(read_only=True)
    locations = VisitSerializer(source="visit_set", many=True)
    
    class Meta:
        model = Case
        fields = ['case_no', 'confirmed', 'origin', 'patient', 'virus', 'locations']

    def to_representation(self, value):
        data = super().to_representation(value)
        patient_serializer = PatientSerializer(value.patient)
        data['patient'] = patient_serializer.data
        virus_serializer = VirusSerializer(value.virus)
        data['virus'] = virus_serializer.data
        return data