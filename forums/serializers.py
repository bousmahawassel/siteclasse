def message_serializer(message):
    return {
        "message": message.message,
        "pseudo": message.pseudo,
        "author": message.author.auth_token.key,
        "date": message.date,
        "forum": message.forum
    }