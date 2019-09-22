from django.shortcuts import render
from rest_framework.response import Response
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
	
@api_view(["GET"])
def edt(request, id, password):
	return Response(None, 501)
	
@api_view(["GET", "POST", "DELETE"])
def devoirs(request):
	pass
	
@api_view(["GET", "POST", "DELETE"])
def home(request):
	pass
