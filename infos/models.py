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
	hour = models.IntegerField(choices=[
		(8, "8h10"),
		(9, "9h05"),
		(10, "10h20"),
		(11, "11h15"),
		(12, "12h10"),
		(13, "13h05"),
		(14, "14h00"),
		(15, "14h55"),
		(16, "16h05"),
		(17, "17h00"),
	])
	duration = models.IntegerField(default=1)
	week = models.IntegerField(choices=[
		(1, 1),
		(2, 2),
		(0, "Toutes les semaines"),
	])
	subject = models.CharField(choices=[
		("maths", "maths"),
		("fr", "français"),
		("LVA", "anglais"),
		("LVBEsp", "Espagnol"),
		("LVBAll", "Allemand"),
		("LVBIta", "Italien LVB"),
		("LVBChi", "Chinois"),
		("ES", "Enseignement Scientifique"),
		("HG", "Histoire-Géo"),
		("EMC", "EMC"),
		("EPS", "EPS"),
		("PH-CH", "Physique-Chimie"),
		("NSI", "NSI"),
		("SVT", "SVT"),
		("Latin", "Latin"),
		("LVCIta", "Italien LVC"),
		("Arts", "Arts Plastiques"),
		("CAM", "Cambridge"),
		("Musique", "Musique"),
		("dej", "déjeuner"),
	], max_length=10, blank=True, default="")
	room = models.CharField(max_length=5,blank = True, default="")
	teacher = models.TextField(blank=True, default="")
	option = models.TextField(blank=True, choices=[
	("LVBEsp", "LVB Espagnol"),
	("LVBAll", "LVB Allemand"),
	("LVBIta", "LVB Italien"),
	("LVBChi", "LVB Chinois"),
	("SVT", "SVT"),
	("NSI", "NSI"),
	("LVCIta", "LVC Italien"),
	("Latin", "Latin"),
	("Arts", "Arts Plastiques"),
	("CAM", "Cambridge"),
	("Musique", "Musique"),
	], default="")
	group = models.IntegerField(choices=[
	(1, "groupe 1"),
	(2, "groupe 2"),
	], null=True)
	ph_prof = models.CharField(choices=[
	("Bernaud", "Bernaud"),
	("Ben Belkacem", "Ben Belkacem"),
	], max_length=15, blank=True, default="")
	ph_group = models.IntegerField(choices=[
	(1, "Groupe 1 Ben Belkacem"),
	(2, "Groupe 2 Ben Belkacem"),
	], blank=True, null=True)

class Timetable(models.Model):
	LVB = models.CharField(choices=[
	("LVBEsp", "LVB Espagnol"),
	("LVBAll", "LVB Allemand"),
	("LVBChi", "LVB Chinois"),
	("LVBIta", "LVB Italien"),
	], max_length=6)
	SP3 = models.CharField(choices=[
	("ISN", "ISN"),
	("SVT", "SVT"),
	], max_length=3)
	option = models.TextField(choices=[
	("Latin", "Latin"),
	("LVCIta", "Italien LVC"),
	("Arts", "Arts Plastiques"),
	("Musique", "Musique"),
	], blank=True)
	cam = models.BooleanField(choices=[
	(True, "Cambridge"),
	(False, "Pas cambridge"),
	])
	hours = models.ManyToManyField(Hour)
	group = models.IntegerField(choices=[
	(1, "groupe 1"),
	(2, "groupe 2"),
	], default=1)
	ph_prof = models.CharField(choices=[
	("Bernaud", "Bernaud"),
	("Ben Belkacem", "Ben Belkacem"),
	], max_length=15, default="Ben Belkacem")
	ph_group = models.IntegerField(choices=[
	(1, "Groupe 1 Ben Belkacem"),
	(2, "Groupe 2 Ben Belkacem"),
	], blank=True, null=True)
	
#class TimetableManager(models.Manager):
#    def get_by_natural_key(self, LVB, SP3, option, cam):
#        return self.get(LVB=LVB, SP3=SP3, option=option, cam=cam)