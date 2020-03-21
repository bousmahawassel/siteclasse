from django.urls import path
from . import views

urlpatterns = [
    path("get_messages", views.get_messages),
]