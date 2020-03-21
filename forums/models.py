from django.db import models
from custom_auth.models import CustomUser
from django.utils import timezone
import string
import random

# Create your models here.

class Message(models.Model):
    message = models.TextField()
    pseudo = models.TextField()
    author = models.ForeignKey(CustomUser, models.SET_NULL, null=True)
    date = models.DateTimeField(timezone.now)
    forum = models.TextField()

def make_token():
    token = ""
    possible = string.ascii_letters + string.digits
    for i in range(40):
        token += random.choice(possible)
    return token

class WebSocketToken(models.Model):
    token = models.CharField(max_length=40, unique=True, default=make_token)