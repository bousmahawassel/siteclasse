from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from infos.models import *
import random

# Create your models here.

def make_link() -> str:
    """
    create a link that will be used for reset the password
    :return: str
    """
    text = ""
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for i in range(0, 20):
        text += random.choice(possible)
    return text

class CustomUserManager(UserManager):
    def create_user(self, email, password, timetable, first_name, last_name):
        if isinstance(timetable, int):
            timetable = Timetable.objects.get(pk=timetable)
        elif isinstance(timetable, Timetable):
            pass
        else:
            raise TypeError
        user = self.model(email=email, timetable=timetable, is_staff=False, is_superuser=False, is_active=True,
                          first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, timetable, first_name, last_name):
        if isinstance(timetable, int):
            timetable = Timetable.objects.get(pk=timetable)
        elif isinstance(timetable, Timetable):
            pass
        else:
            raise TypeError
        user = self.model(email=email, timetable=timetable, is_staff=True, is_superuser=True, is_active=True,
                          first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user

class CustomUser(AbstractUser):
    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    email = models.EmailField(unique=True)
    timetable = models.ForeignKey('infos.Timetable', models.PROTECT)
    link = models.CharField(max_length=30, default=make_link, unique=True)
    link_is_active = models.BooleanField(default=False)
    objects = CustomUserManager()

