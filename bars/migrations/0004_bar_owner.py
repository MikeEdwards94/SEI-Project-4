# Generated by Django 3.2 on 2021-04-15 18:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bars', '0003_bar_events'),
    ]

    operations = [
        migrations.AddField(
            model_name='bar',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_bars', to='jwt_auth.user'),
            preserve_default=False,
        ),
    ]
