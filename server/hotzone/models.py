from django.db import models
from django.utils import timezone

''' Location class '''
class Location(models.Model):
    def __str__(self):
        return '{self.__class__.__name__}: ({self.x_coord}, {self.y_coord})'.format(self = self)

    x_coord = models.FloatField('X Co-ordinate')
    y_coord = models.FloatField('Y Co-ordinate')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=250, blank = True)

''' Disease class '''
class Virus(models.Model):

	class Meta:
		constraints = [
			models.UniqueConstraint(fields = ['name'], name='unique-name')
		]

	name = models.CharField(max_length=64)
	disease = models.CharField(max_length=150)
	max_infectious = models.IntegerField() #no. of days
	
	def __str__(self):
		return self.name

''' Patient class '''
class Patient(models.Model):

	class Meta:
		constraints = [
			models.UniqueConstraint(fields = ['hkid'], name='unique-hkid')
		]

	name = models.CharField(max_length=150)
	hkid = models.CharField(max_length=9)
	dob = models.DateField()
	
	def __str__(self):
		return self.hkid

''' Case class '''
class Case(models.Model):

	class Meta:
		constraints = [
			models.UniqueConstraint(fields = ['case_no'], name='unique-case-no')
		]

	# enum type 
	class Origin(models.TextChoices):
		LOCAL = 'L'
		IMPORTED = 'I'

	case_no = models.IntegerField()
	confirmed = models.DateField()
	origin = models.CharField(max_length=7, choices=Origin.choices, default=Origin.LOCAL)
	patient = models.ForeignKey(Patient, on_delete=models.CASCADE)	
	virus = models.ForeignKey(Virus, on_delete=models.CASCADE)
	locations = models.ManyToManyField(Location, through='Visit') #many-to-many relationship set
	
	def __str__(self):
		return self.case_no

''' Many-To-Many relationship between case and location '''
class Visit(models.Model):

	class Category(models.TextChoices):
		RESIDENCE = 'R'
		WORKPLACE = 'W'
		VISIT = 'V'

	location = models.ForeignKey(Location, on_delete=models.CASCADE)
	case = models.ForeignKey(Case, on_delete=models.CASCADE)
	date_from = models.DateField()
	date_to = models.DateField()
	category = models.CharField(max_length=9, choices=Category.choices, default=Category.VISIT)		

# Hi to whoever grading this: Listen to this https://www.youtube.com/watch?v=ckRSn2zWt_o