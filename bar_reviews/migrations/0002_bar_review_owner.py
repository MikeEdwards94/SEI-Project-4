# Generated by Django 3.2 on 2021-04-15 18:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bar_reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bar_review',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='bar_reviews', to='jwt_auth.user'),
            preserve_default=False,
        ),
    ]
