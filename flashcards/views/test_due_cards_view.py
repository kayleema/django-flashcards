from datetime import timedelta, datetime
from unittest.mock import patch

from django.utils import timezone

from django.contrib.auth.models import User
from django.test import Client
from django.test import TestCase

from flashcards.models.models import Card


class DueCardsViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create_user('tester')
        self.test_user2 = User.objects.create_user('tester2')

    @patch('django.utils.timezone.now')
    def test_get_due_cards(self, mock_timezone):
        mock_date = datetime(2021, 5, 20, tzinfo=timezone.utc)
        mock_timezone.return_value = mock_date

        self.client.force_login(self.test_user)
        Card.objects.create(front="足袋", back="たび", author=self.test_user, interval=1,
                            due_date=timezone.now() - timedelta(days=10))
        Card.objects.create(front="麻雀", back="マージャン", author=self.test_user, interval=1,
                            due_date=timezone.now())
        Card.objects.create(front="七夕", back="たなばた", author=self.test_user2, interval=1,
                            due_date=timezone.now() + timedelta(days=1))

        response = self.client.get('/flashcards/due/')

        self.assertEqual(response.json(), [
            {"id": 1, "front": "足袋", "back": "たび", "author": self.test_user.id, 'interval': 1,
             'due_date': '2021-05-10'},
            {"id": 2, "front": "麻雀", "back": "マージャン", "author": self.test_user.id, 'interval': 1,
             'due_date': '2021-05-20'}
        ])
