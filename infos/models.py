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
    hour = models.FloatField(choices=[
        (8, "8h10"),
        (9, "9h05"),
        (10, "10h20"),
        (11, "11h15"),
        (11.5, "11h45"),
        (12, "12h10"),
        (13, "13h05"),
        (14, "14h00"),
        (15, "14h55"),
        (16, "16h05"),
        (17, "17h00"),
    ])
    duration = models.FloatField(default=1)
    week = models.IntegerField(choices=[
        (1, 1),
        (2, 2),
        (0, "Toutes les semaines"),
    ], default=0)
    subject = models.CharField(choices=[
        ("maths", "maths"),
        ("fr", "français"),
        ("LVA", "anglais"),
        ("LVBEsp", "Espagnol"),
        ("LVBAll", "Allemand"),
        ("Italien", "Italien"),
        ("LVBChi", "Chinois"),
        ("ES", "Enseignement Scientifique"),
        ("HG", "Histoire-Géo"),
        ("EMC", "EMC"),
        ("EPS", "EPS"),
        ("PH-CH", "Physique-Chimie"),
        ("NSI", "NSI"),
        ("SVT", "SVT"),
        ("Latin", "Latin"),
        ("Arts", "Arts Plastiques"),
        ("CAM", "Cambridge"),
        ("Musique", "Musique"),
        ("dej", "déjeuner"),
        ("DST", "DST"),
        ("VDC", "Vie de classe")
    ], max_length=10, blank=True, default="")
    room = models.CharField(max_length=5,blank = True, default="")
    teacher = models.TextField(blank=True, default="")
    
class WeekHours(models.Model):
    day = models.IntegerField(choices=[
        (1, "LUNDI"),
        (2, "MARDI"),
        (3, "MERCREDI"),
        (4, "JEUDI"),
        (5, "VENDREDI"),
    ])
    hour = models.FloatField(choices=[
        (8, "8h10"),
        (9, "9h05"),
        (10, "10h20"),
        (11, "11h15"),
        (11.5, "11h45"),
        (12, "12h10"),
        (13, "13h05"),
        (14, "14h00"),
        (15, "14h55"),
        (16, "16h05"),
        (17, "17h00"),
    ])
    duration = models.FloatField(default=1)
    hours = models.ManyToManyField('Hour')

class DefaultHours(SingletonModel):
    hours = models.ManyToManyField('Hour')
    week_hours = models.ManyToManyField('WeekHours')

class Option(models.Model):
    name_opt = models.TextField(unique=True)
    hours = models.ManyToManyField('Hour')
    week_hours = models.ManyToManyField('WeekHours')

class Timetable(models.Model):
    hours = models.ManyToManyField('Option')

#class TimetableManager(models.Manager):
#    def get_by_natural_key(self, LVB, SP3, option, cam):
#        return self.get(LVB=LVB, SP3=SP3, option=option, cam=cam)