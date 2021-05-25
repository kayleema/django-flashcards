# Generated by Django 3.2 on 2021-05-24 08:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('flashcards', '0004_alter_card_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='due_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='interval',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
