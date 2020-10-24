from django.db import models
from django.utils import timezone

class Location(models.Model):
    def __str__(self):
      return '{self.__class__.__name__}: ({self.x_coord}, {self.y_coord})'.format(self = self)

    x_coord = models.IntegerField('X Co-ordinate')
    y_coord = models.IntegerField('Y Co-ordinate')
    address = models.CharField(max_length=250)
    location = models.CharField(max_length=250)