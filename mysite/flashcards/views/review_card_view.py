import json
from datetime import timedelta

from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from flashcards.models.models import Card


@csrf_exempt
def review_card(request):
    request_data = json.loads(request.body)
    reviewed_card = Card.objects.get(id=request_data["id"])
    if request_data["isCorrect"]:
        reviewed_card.interval *= 2
    else:
        reviewed_card.interval = 1
    reviewed_card.due_date = timezone.now() + timedelta(days=reviewed_card.interval)
    reviewed_card.save()

    return JsonResponse({})
