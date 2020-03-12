from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import forums.routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
'websocket': AuthMiddlewareStack(
        URLRouter(
            forums.routing.websocket_urlpatterns
        )
    ),
})