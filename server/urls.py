from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import views as auth_views


from .views import index

# This, as you can see, is a hacky fix.
urlpatterns = [
    path('hotzone/', include('hotzone.urls')),
    path('hotzone', include('hotzone.urls')),
    path('admin/', admin.site.urls),
    path('admin', admin.site.urls),
    path('login/', obtain_auth_token),
    path("password-reset/", auth_views.PasswordResetView.as_view(), name="password_reset"),
    path("password-reset/done/", auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
    path("password-reset-confirm/<uidb64>/<token>/", auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("password-reset-complete/", auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),    
    re_path(r'^(?!hotzone).*$', index, name="index"),
]