# Generated by Django 3.2 on 2021-04-14 14:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bars', '0002_alter_bar_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bar_Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=300)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('bar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bar_reviews', to='bars.bar')),
            ],
        ),
    ]
