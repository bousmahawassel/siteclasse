from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *

# Create your views here.

@api_view(["GET"])
def get_messages(request):
    token = request.headers.get("Authorization")
    if not token:
        return Response({"error": "Tu n'es pas connecté"}, status.HTTP_401_UNAUTHORIZED)
    try:
        Token.objects.get(key=token).user
    except:
        return Response({"error": "Il y a eu un problème, tu dois te reconnecter"}, status.HTTP_401_UNAUTHORIZED)
    messages = Message.objects.all()
    messages = [message_serializer(message) for message in messages]
    print(messages)
    return Response({"token": WebSocketToken.objects.create().token, "messages": messages})