from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import EventReviewSerializer
from .models import EventReview

class EventReviewListView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        request.data["owner"] = request.user.id
        event_review_to_create = EventReviewSerializer(data=request.data)
        if event_review_to_create.is_valid():
            event_review_to_create.save()
            return Response(event_review_to_create.data, status=status.HTTP_201_CREATED)
        return Response(event_review_to_create.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class EventReviewDetailView(APIView):

    def delete(self, request, pk):
        try:
            event_review_to_delete = EventReview.objects.get(pk=pk)
        except EventReview.DoesNotExist:
            raise NotFound()
        if event_review_to_delete.owner != request.user:
            raise PermissionDenied()
        event_review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)