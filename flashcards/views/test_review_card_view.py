import json
from datetime import datetime, date, timezone
from unittest.mock import patch
from django.contrib.auth.models import User
from django.test import Client
from django.test import TestCase

from flashcards.models.models import Card


class ReviewCardViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create_user('tester')
        self.test_user2 = User.objects.create_user('tester2')

    @patch('django.utils.timezone.now')
    def test_review_card_successful_returns_200_and_updates_due_date(self, mock_timezone):
        mock_date = datetime(2021, 5, 24, tzinfo=timezone.utc)
        mock_timezone.return_value = mock_date

        self.client.force_login(self.test_user)
        Card.objects.create(front="鞠", back="まり", author=self.test_user, interval=1)
        response = self.client.post(
            '/flashcards/review/', json.dumps({
                "id": 1,
                "isCorrect": True
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Card.objects.get(id=1).interval, 2)
        self.assertEqual(Card.objects.get(id=1).due_date, date(2021, 5, 26))

    @patch('django.utils.timezone.now')
    def test_review_card_incorrect_sets_interval_to_1(self, mock_timezone):
        mock_date = datetime(2021, 5, 26, tzinfo=timezone.utc)
        mock_timezone.return_value = mock_date

        self.client.force_login(self.test_user)
        Card.objects.create(front="麦藁帽子", back="むぎわらぼうし", author=self.test_user, interval=4)
        response = self.client.post(
            '/flashcards/review/', json.dumps({
                "id": 1,
                "isCorrect": False
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Card.objects.get(id=1).interval, 1)
        self.assertEqual(Card.objects.get(id=1).due_date, date(2021, 5, 27))
