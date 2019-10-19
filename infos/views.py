from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *

# Create your views here.

@api_view(["GET", "POST"])
def vie_scolaire(request):
    pass

@api_view(["GET", "POST"])
def docs_a_rendre(request):
    pass

@api_view(["GET"])
def edt(request, id=None, password=None):
    edt = Timetable.objects.all()[0]
    hours = [option.hours.all() for option in edt.hours.all()] + list(DefaultHours.load().hours.all())
    data = [HourSerializer(hour).data for hour in hours]
    return Response(data, status.HTTP_200_OK)

@api_view(["GET", "POST", "DELETE"])
def devoirs(request):
    pass

@api_view(["GET", "POST", "DELETE"])
def home(request):
    pass
