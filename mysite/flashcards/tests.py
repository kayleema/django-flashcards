from django.test import TestCase
from flashcards.models import Card


# Create your tests here.
class FlashCardModelTest(TestCase):
    def setUp(self):
        Card.objects.create(front="虫歯", back="dental cavity")

    def test_create_flash_card(self):
        card = Card.objects.get(front="虫歯")
        self.assertEqual(card.back, "dental cavity")


