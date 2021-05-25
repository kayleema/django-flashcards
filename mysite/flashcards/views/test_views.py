import json

from django.contrib.auth.models import User
from django.test import Client
from django.test import TestCase

from flashcards.models.models import Card


class ViewsTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create_user('tester')
        self.test_user2 = User.objects.create_user('tester2')

    def test_require_login(self):
        response = self.client.get('/flashcards/cards/')

        self.assertEqual(response.status_code, 403)

    def test_when_no_cards_return_empty_list(self):
        self.client.force_login(self.test_user)
        response = self.client.get('/flashcards/cards/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_returns_list_of_cards_by_logged_in_user(self):
        self.client.force_login(self.test_user)
        Card.objects.create(front="足袋", back="たび", author=self.test_user)
        Card.objects.create(front="麻雀", back="マージャン", author=self.test_user)
        Card.objects.create(front="七夕", back="たなばた", author=self.test_user2)

        response = self.client.get('/flashcards/cards/')

        self.assertEqual(response.json(), [
            {"id": 1, "front": "足袋", "back": "たび", "author": self.test_user.id},
            {"id": 2, "front": "麻雀", "back": "マージャン", "author": self.test_user.id}
        ])

    def test_create_user(self):
        self.client.force_login(self.test_user)

        response = self.client.post(
            '/flashcards/cards/', json.dumps({
                "front": "足袋",
                "back": "たび"
            }),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, 201)

        response = self.client.get('/flashcards/cards/')

        self.assertEqual(response.json(), [
            {"id": 1, "front": "足袋", "back": "たび", "author": self.test_user.id}
        ])



