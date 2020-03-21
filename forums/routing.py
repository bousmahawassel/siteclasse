from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'forums/(?P<forum>\w+)/(?P<token>\w+)$', consumers.ChatConsumer),
]