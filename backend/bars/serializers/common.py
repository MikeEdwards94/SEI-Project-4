from rest_framework import serializers
from ..models import Bar

class BarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bar
        fields = '__all__'

class BarEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bar
        fields = ('name', 'image', 'description', 'fb_link', 'twitter_link', 'instagram_link', 'tags')