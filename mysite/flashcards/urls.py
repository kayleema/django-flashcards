from django.urls import path, include
from rest_framework import routers

from flashcards.views.review_card_view import review_card
from flashcards.views.views import CardViewSet


router = routers.DefaultRouter()
router.register('cards', CardViewSet, basename="cards")

urlpatterns = [
    path('', include(router.urls)),
    path('review/', review_card)
]
