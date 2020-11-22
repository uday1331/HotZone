from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token


from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('hotzone/', include('hotzone.urls')),
    path('admin/', admin.site.urls),
    path('login/', obtain_auth_token),
]