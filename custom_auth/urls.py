from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login),
    path("reset_password", views.reset_password),
    path("reset_password/<link>", views.reset_password),
]