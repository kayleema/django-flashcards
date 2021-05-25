from django.test import TestCase
from flashcards.models.models import Card
from django.contrib.auth.models import User


class FlashCardModelTest(TestCase):
    def setUp(self):
        Card.objects.create(front="虫歯", back="dental cavity", author=User.objects.create_user('test user'))

    def test_create_flash_card(self):
        card = Card.objects.get(front="虫歯")
        self.assertEqual(card.back, "dental cavity")
