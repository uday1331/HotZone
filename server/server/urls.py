from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.authtoken.views import obtain_auth_token


from .views import index

# This, as you can see, is a hacky fix.
urlpatterns = [
    path('hotzone/', include('hotzone.urls')),
    path('hotzone', include('hotzone.urls')),
    path('admin/', admin.site.urls),
    path('admin', admin.site.urls),
    path('login/', obtain_auth_token),
    re_path(r'^(?!hotzone).*$', index, name="index")
]