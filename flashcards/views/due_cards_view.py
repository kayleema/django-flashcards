from django.utils import timezone

from rest_framework import permissions
from rest_framework import viewsets

from flashcards.card_serializer import CardSerializer
from flashcards.models.models import Card


class DueCardsViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(author=self.request.user, due_date__lte=timezone.now())
