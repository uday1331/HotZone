from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

class AuthenticationBackend(BaseBackend):
    # Basic authentication method
    # kwargs should include the username and password
    # return the user object
    def authenticate(self, request, **kwargs):
        username = kwargs['username']
        password = kwargs['password']

        try:
            staff = User.objects.get(pk=username)
            if check_password(password, staff.password)
                return staff
        return None

    # Reset password method
    # kwargs should include the username and NEW password

    def reset_password(self, request, **kwargs):
        username = kwargs['username']
        new_password = kwargs['password']

        try:
            user = User.Objects.get(pk=username)
            if user:
                user.set_password(new_password)
                user.save()
                return 0
        return None


    # Returns the user object of a given username
    def get_user(self, username):
        try:
            return User.objects.get(pk=username)
        except User.DoesNotExist:
            return None