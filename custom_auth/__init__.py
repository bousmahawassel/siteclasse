from rest_framework.authentication import TokenAuthentication

class CustomTokenAuthentication(TokenAuthentication):
    keyword = "Jeton d'authification"