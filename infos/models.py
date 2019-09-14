from django.db import models

# Create your models here.

class SingletonModel(models.Model):
	class Meta:
		abstract = True
		
	def save(self, *args, **kwargs):
		self.pk = 1
		super(SingletonModel, self).save(*args, **kwargs)
		
	def delete(self, *args, **kwargs):
		pass
		
	@classmethod
	def load(cls):
		obj, created = cls.objects.get_or_create(pk=1)
		return obj
		
class Hour(models.Model):
	day = models.IntegerField(choices=[
		(1, "LUNDI"),
		(2, "MARDI"),
		(3, "MERCREDI"),
		(4, "JEUDI"),
		(5, "VENDREDI"),
	])
	subject = models.CharField(choices=[
		("maths", "maths"),
		("fr", "français"),
		("LVA", "anglais"),
		("LVBesp", "Espagnol"),
		("LVBAll", "Allemand"),
		("LVBIta", "Italien"),
		("LVBChi", "Chinois"),
		("ES", "Enseignement Scientifique"),
		("HG", "Histoire-Géo"),
		("EMC", "EMC"),
		("EPS", "EPS"),
		("PH-CH", "Physique-Chimie"),
		("NSI", "NSI"),
		("SVT", "SVT"),
		("Latin", "Latin"),
		("LV3Ita", "Italien"),
		("Arts", "Arts Plastiques"),
		("CAM", "Cambridge"),
	], max_length=10)

class Timetable(models.Model):
	pass