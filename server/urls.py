from django.contrib import admin
from django.urls import include, path

from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('hotzone/', include('hotzone.urls')),
    path('admin/', admin.site.urls),
]