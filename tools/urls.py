from django.urls import path
from .views import *

urlpatterns = [
    path("maths/suites/arithm", suite_arithm),
]