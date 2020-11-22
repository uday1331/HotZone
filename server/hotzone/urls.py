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
<<<<<<< HEAD
=======
    path('change_password/', views.ChangePassword.as_view()),
>>>>>>> b5e0ffc31f8df30ad9652bc7bd87c2ceb1ecb67f
]

urlpatterns = format_suffix_patterns(urlpatterns)
