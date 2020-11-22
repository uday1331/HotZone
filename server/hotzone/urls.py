from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('locations/', views.LocationList.as_view()),
    path('locations/<int:pk>/', views.LocationDetail.as_view()),
    path('locations/<str:name>/', views.LocationSearchFromGeoData.as_view()),
    path('patients/', views.PatientList.as_view()),
    path('cases/', views.CasesList.as_view()),
    path('case/<int:case_no>/', views.CaseOne.as_view()),
    path('login/', obtain_auth_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)
