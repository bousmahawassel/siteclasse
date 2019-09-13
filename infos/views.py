from django.shortcuts import render
from rest_framework.response import response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *

# Create your views here.

@api_view(["GET", "POST"])
def vie_scolaire(request):
	pass
	
@api_view(["GET", "POST"])
def docs_a_rendre(request):
	pass
	
@api_view(["GET", "POST"])
def emploi_du_temps(request):
	pass
	
@api_view(["GET", "POST", "DELETE"])
def devoirs(request):
	pass
