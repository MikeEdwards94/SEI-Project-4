# Generated by Django 3.2 on 2021-04-20 13:36

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bar_reviews', '0008_auto_20210420_1323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bar_review',
            name='likes',
            field=models.ManyToManyField(default=None, related_name='bar_review_like', to=settings.AUTH_USER_MODEL),
        ),
    ]