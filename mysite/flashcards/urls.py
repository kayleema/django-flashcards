from django.urls import path, include
from . import views
from rest_framework import routers, serializers, viewsets
from .models import Card


class CardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Card
        fields = ['front', 'back']


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('cards', CardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', views.index, name='index'),
]
