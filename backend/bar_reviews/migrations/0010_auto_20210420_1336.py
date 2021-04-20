# Generated by Django 3.2 on 2021-04-20 13:36

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bar_reviews', '0009_alter_bar_review_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bar_review',
            name='dislikes',
            field=models.ManyToManyField(default=None, related_name='bar_review_dislike', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='bar_review',
            name='funny',
            field=models.ManyToManyField(default=None, related_name='bar_review_funny', to=settings.AUTH_USER_MODEL),
        ),
    ]