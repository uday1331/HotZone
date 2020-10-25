from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('locations/', views.location_list),
    path('locations/<int:pk>/', views.location_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
