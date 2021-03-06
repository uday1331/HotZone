from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib.auth import views as auth_views


from . import views

urlpatterns = [
    path('locations/', views.LocationList.as_view()),
    path('locations/<int:pk>/', views.LocationDetail.as_view()),
    path('locations/<str:name>/', views.LocationSearchFromGeoData.as_view()),
    path('patients/', views.PatientList.as_view()),
    path('cases/', views.CasesList.as_view()),
    path('case/<int:case_no>/', views.CaseOne.as_view()),
    path('clusters/', views.ClustersList.as_view()),
    path('change_password/', views.ChangePassword.as_view()),
    path('visit/', views.VisitList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
