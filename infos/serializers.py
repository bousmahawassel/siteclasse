from rest_framework import serializers
from .models import *

class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = [
            "hours",
        ]

class DefaultHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultHours
        fields = "__all__"

class HourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hour
        fields = "__all__"
