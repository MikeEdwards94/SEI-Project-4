from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    description = models.CharField(max_length=300)
    day_of_the_week = models.CharField(max_length=30)
    website = models.URLField(max_length=300)
    fb_link = models.URLField(max_length=300)
    twitter_link = models.URLField(max_length=300)
    instagram_link = models.URLField(max_length=300)
    tags = models.CharField(max_length=50)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_events',
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f"{self.name}, {self.tags}"