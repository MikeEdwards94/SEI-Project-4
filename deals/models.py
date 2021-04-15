from django.db import models

class Deal(models.Model):
    day_of_the_week = models.CharField(max_length=20)
    description = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    bar = models.ForeignKey(
        "bars.Bar",
        related_name="deals",
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="deals",
        on_delete=models.CASCADE
    )