from django.db import models

class EventReview(models.Model):
    text = models.TextField(max_length=300)
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