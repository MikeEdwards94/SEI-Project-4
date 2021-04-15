from rest_framework import serializers
from ..models import EventReview

class EventReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventReview
        fields = '__all__'