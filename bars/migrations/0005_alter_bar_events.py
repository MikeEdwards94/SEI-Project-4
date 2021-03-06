# Generated by Django 3.2 on 2021-04-20 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_event_owner'),
        ('bars', '0004_bar_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bar',
            name='events',
            field=models.ManyToManyField(blank=True, related_name='bars', to='events.Event'),
        ),
    ]
