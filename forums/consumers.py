from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Message, WebSocketToken
from rest_framework.authtoken.models import Token

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.forum = self.scope["url_route"]["kwargs"]["forum"]
        ws_token = self.scope["url_route"]["kwargs"]["token"]
        # Join room group
        try:
            WebSocketToken.objects.get(token=ws_token)
            await self.channel_layer.group_add(
                self.forum,
                self.channel_name
            )
            await self.accept()
        except:
            self.close()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.forum,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await sync_to_async(Message.objects.create)(message=message["message"], date=message["date"],
                                                    author=Token.objects.get(key=message["author"]).user,
                                                    pseudo=message["pseudo"])
        await self.channel_layer.group_send(
            self.forum,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))