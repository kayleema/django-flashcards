from rest_framework import serializers

from flashcards.models.models import Card


class CardSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Card
        fields = ['id', 'front', 'back', 'author', 'interval', 'due_date']