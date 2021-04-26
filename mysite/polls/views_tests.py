from django.test import TestCase
from django.test import Client


class ViewsTests(TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_when_no_cards_return_empty_list(self):
        # Issue a GET request.
        response = self.client.get('/polls/cards')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()['cards']), 0)
