from django.db import models

class Bar_Review(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    bar = models.ForeignKey(
        "bars.Bar",
        related_name="bar_reviews",
        on_delete= models.CASCADE
    )