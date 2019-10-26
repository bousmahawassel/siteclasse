from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .models import CustomUser
from siteclasse.settings import FRONT_END

# Create your views here.

@api_view(["GET", "POST"])
def reset_password(request, link = None):
    if request.method == "POST":
        print("reset_password.POST")
        data = request.data
        if not link:
            try:
                user = CustomUser.objects.get(email=data.email)
            except:
                return Response(
                    {
                        "error": "Ton adresse e-mail n'a pas été reconnu. Vérifie qu'il n'y a pas d'erreur dans ce que tu as écrit,"
                                 " puis préviens-moi via Whatsapp, par SMS au 07 83 45 19 66 ou par mail à "
                                 "l'adresse wassel2005@gmail.com en ayant fait une capture d'écran"
                    }, status.HTTP_404_NOT_FOUND
                )
            message = Mail(
                from_email='Site des 1ère 5 <nepasrepondre@1ere5.fr>',
                to_emails=data.email,
                subject='Changement de mots de passe',
                html_content=f'<p>Voici le <a href={FRONT_END}/reset_password/{user.link}>lien</a>'
                             f' où tu peux changer de mot de passe')
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            try:
                sg.send(message)
            except:
                return Response(
                    {"error": "Suite à une erreur au niveau du serveur, le mail n'a pu être envoyé. "
                              "Réessaye d'ici quelques minutes, et préviens-moi via Whatsapp, par SMS au 07 83 45 19 66"
                              " ou par mail à l'adresse wassel2005@gmail.com, après avoir fait une capture d'écran"},
                    status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            user.link_is_active = True
            user.save()
            return Response(None, status.HTTP_200_OK)
        else:
            user = CustomUser.objects.get(link=link)
            user.link_is_active = False
            user.set_password(data.password)
            user.save()
            return Response(
                "Ton mot de passe a bien été changé. Maintenant, tu peux te connecter !",
                status.HTTP_202_ACCEPTED
            )
    elif request.method == "GET":
        try:
            user = CustomUser.objects.get(link=link)
        except:
            return Response({"error": "Ce lien n'existe pas. Vérifie que c'est le lien que tu as reçu par mail, "
                                      "puis contacte-moi via Whatsapp, par SMS au 07 83 45 19 66 ou par mail à l'adresse"
                                      " wassel2005@gmail.com, après avoir fait une capture d'écran"},
                            status.HTTP_400_BAD_REQUEST)
        if user.link_is_active:
            return Response(None, status.HTTP_200_OK)
        else:
            return Response({"error": "Ce lien n'est pas actif. Si tu avais fait une demande de changement de mot "
                                      "de passe et que tu rencontres cette erreur, contacte-moi via Whatsapp,"
                                      " par SMS au 07 83 45 19 66 ou par mail à l'adresse wassel2005@gmail.com, après"
                                      " avoir fait une capture d'écran"}, status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login(request):
    data = request.data
    try:
        user = CustomUser.objects.get(email=data.email)
    except:
        return Response({"error": "L'email que tu as fourni est incorrect"}, status.HTTP_401_UNAUTHORIZED)
    if user.check_password(data.password):
        return Response({"token": Token.objects.get_or_create(user=user)}, status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Le mot de passe que tu as fourni est incorrect"},
            status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": "Token"}
        )
