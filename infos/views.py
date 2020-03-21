from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import *
from .models import *

# Create your views here.

@api_view(["GET", "POST"])
def vie_scolaire(request):
    pass

@api_view(["GET", "POST"])
def docs_a_rendre(request):
    pass

@api_view(["GET"])
def edt(request):
    token = request.headers.get("Authorization")
    if not token:
        return Response({"error": "Tu n'es pas connecté"}, status.HTTP_401_UNAUTHORIZED)
    try:
        user = Token.objects.get(key=token).user
    except:
        return Response({"error": "Il y a eu un problème, tu dois te reconnecter"}, status.HTTP_401_UNAUTHORIZED)
    edt = user.timetable
    hours = list(DefaultHours.load().hours.all())
    hours.extend(list(DefaultHours.load().week_hours.all()))
    for option in edt.hours.all():
        for hour in option.hours.all():
            hours.append(hour)
        for hour in option.week_hours.all():
            hours.append(hour)
    data = [HourSerializer(hour).data if isinstance(hour, Hour) else WeekHoursSerializer(hour).data for hour in hours]
    return Response(data, status.HTTP_200_OK)

@api_view(["GET", "POST", "DELETE"])
def devoirs(request):
    pass

@api_view(["GET", "POST", "DELETE"])
def home(request):
    pass
