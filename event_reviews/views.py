from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import EventReviewSerializer
from .models import EventReview

class EventReviewListView(APIView):

    def post(self, request):
        event_review_to_create = EventReviewSerializer(data=request.data)
        if event_review_to_create.is_valid():
            event_review_to_create.save()
            return Response(event_review_to_create.data, status=status.HTTP_201_CREATED)
        return Response(event_review_to_create.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class EventReviewDetailView(APIView):

    def delete(self, _request, pk):
        try:
            event_review_to_delete = EventReview.objects.get(pk=pk)
        except EventReview.DoesNotExist:
            raise NotFound()
        event_review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)