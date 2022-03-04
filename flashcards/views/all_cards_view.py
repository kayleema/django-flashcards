from rest_framework import permissions
from rest_framework import viewsets

from flashcards.card_serializer import CardSerializer
from flashcards.models.models import Card

class AllCardsViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)



