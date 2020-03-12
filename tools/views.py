from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
# Create your views here.

@api_view(["POST"])
def suite_arithm(request):
    token = request.headers.get("Authorization")
    if not token:
        return Response({"error": "Tu n'es pas connecté"}, status.HTTP_401_UNAUTHORIZED)
    try:
        user = Token.objects.get(key=token).user
    except:
        return Response({"error": "Il y a eu un problème, tu dois te reconnecter"}, status.HTTP_401_UNAUTHORIZED)
    if request.data["command"] == "calculate":
        r = request.data["raison"]
        u0 = request.data["u0"]
        n = request.data["n"]
        recursive = request.data.get("recursive", False)
        suite, created = SuiteArithmetiqueModel.objects.get_or_create(raison=r, u0=u0)
        return Response(suite.calculate(n, recursive), status.HTTP_200_OK)
    elif request.data["command"] == "get_raison":
        dico_values = request.data["values"]
        suite, created = SuiteArithmetiqueModel.get_suite(dico_values)
        return Response({"raison": suite.raison, "u0": suite.u0}, status.HTTP_200_OK)