from django.urls import path, include
from rest_framework import routers

from flashcards.views.due_cards_view import DueCardsViewSet
from flashcards.views.review_card_view import review_card
from flashcards.views.all_cards_view import AllCardsViewSet


router = routers.DefaultRouter()
router.register('cards', AllCardsViewSet, basename="cards")
router.register('due', DueCardsViewSet, basename="due_cards")

urlpatterns = [
    path('', include(router.urls)),
    path('review/', review_card),
]
