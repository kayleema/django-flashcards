from rest_framework import serializers

from flashcards.models.models import Card


class CardSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name="cards-detail")

    class Meta:
        model = Card
        fields = ['url', 'id', 'front', 'back', 'author', 'interval', 'due_date']
