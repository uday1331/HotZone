from django.contrib import admin

from .models import Location, Virus, Patient, Case, Visit

admin.site.register(Location)
admin.site.register(Virus)
admin.site.register(Patient)
admin.site.register(Case)
admin.site.register(Visit)