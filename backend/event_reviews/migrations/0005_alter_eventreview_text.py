# Generated by Django 3.2 on 2021-04-21 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_reviews', '0004_alter_eventreview_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventreview',
            name='text',
            field=models.TextField(max_length=1000),
        ),
    ]
