# Generated by Django 3.2 on 2021-05-24 08:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('flashcards', '0006_auto_20210524_1744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='due_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
