from django.db import models


class Card(models.Model):
    front = models.TextField()
    back = models.TextField()
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=False)
