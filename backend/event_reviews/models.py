from django.db import models
from project import settings


class EventReview(models.Model):
    text = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    event = models.ForeignKey(
        "events.Event",
        related_name="event_reviews",
        on_delete= models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="event_reviews",
        on_delete = models.CASCADE
    )
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        default=None,
        related_name='event_review_like')
    dislikes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        default=None,
        related_name='event_review_dislike'
        )
    funny = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        default=None,
        related_name='event_review_funny'
        )
