from django.db import models
from datetime import datetime
from project import settings

class Bar_Review(models.Model):
    text = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    bar = models.ForeignKey(
        "bars.Bar",
        related_name="bar_reviews",
        on_delete= models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="bar_reviews",
        on_delete = models.CASCADE
    )
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        default=None,
        related_name='bar_review_like')
    dislikes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        default=None,
        related_name='bar_review_dislike'
        )
    funny = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        default=None,
        related_name='bar_review_funny'
        )
