from django.http import HttpResponse, JsonResponse


def index(request):
    return HttpResponse("Hello, world. You're at the flashcards index.")


def cards(request):
    return JsonResponse({"cards": []})
