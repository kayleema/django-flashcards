from django.db import models
from datetime import date


class Card(models.Model):
    front = models.TextField()
    back = models.TextField()
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=False)
    interval = models.IntegerField(default=1)
    due_date = models.DateField(default=date.today)
