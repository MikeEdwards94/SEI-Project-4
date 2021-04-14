from django.db import models

class Bar(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    description = models.CharField(max_length=300)
    fb_link = models.URLField(max_length=300)
    twitter_link = models.URLField(max_length=300)
    instagram_link = models.URLField(max_length=300)
    tags = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}, {self.tags}"