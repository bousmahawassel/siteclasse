from rest_framework import serializers
from .models import *

class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = [
            "hours",
        ]

class HourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hour
        fields = "__all__"

class WeekHoursSerializer(serializers.ModelSerializer):
    hours = HourSerializer(read_only=True, many=True)
    class Meta:
        model = WeekHours
        fields = "__all__"