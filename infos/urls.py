from django.urls import path
from . import views

urlpatterns = [
#	path("edt/<str:id>/<str:password>", views.edt, name="edt"),
	path("edt", views.edt, name="edt"),
]