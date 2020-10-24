import datetime

from django.db import models
from django.utils import timezone


class Question(models.Model):
    def __str__(self):
      return '{self.__class__.__name__} - {self.question_text}'.format(self = self)

    def was_published_recently(self):
      return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    def __str__(self):
      return '{self.__class__.__name__} - {self.choice_text}'.format(self = self)
      
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)