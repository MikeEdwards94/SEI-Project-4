# Generated by Django 3.2 on 2021-04-19 23:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bar_reviews', '0003_bar_review_likes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bar_review',
            name='likes',
        ),
    ]
