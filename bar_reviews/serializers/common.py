from rest_framework import serializers
from ..models import Bar_Review

class BarReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bar_Review
        fields = '__all__'