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

class EventReviewLike(APIView):
    permission_classes = (IsAuthenticated,)


    def get(self, request, pk):
        try:
            event_reveiew_to_like = EventReview.objects.get(pk=pk)
        except EventReview.DoesNotExist:
            raise NotFound()
        if request.user in event_reveiew_to_like.likes.all():
            event_reveiew_to_like.likes.remove(request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            event_reveiew_to_like.likes.add(request.user)
            event_reveiew_to_like.save()
            return Response(status=status.HTTP_201_CREATED)

class EventReviewDislike(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        try:
            event_reveiew_to_dislike = EventReview.objects.get(pk=pk)
        except EventReview.DoesNotExist:
            raise NotFound()
        if request.user in event_reveiew_to_dislike.dislikes.all():
            event_reveiew_to_dislike.dislikes.remove(request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            event_reveiew_to_dislike.dislikes.add(request.user)
            event_reveiew_to_dislike.save()
            return Response(status=status.HTTP_201_CREATED)

class EventReviewFunny(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        try:
            event_reveiew_to_funny = EventReview.objects.get(pk=pk)
        except EventReview.DoesNotExist:
            raise NotFound()
        if request.user in event_reveiew_to_funny.funny.all():
            event_reveiew_to_funny.funny.remove(request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            event_reveiew_to_funny.funny.add(request.user)
            event_reveiew_to_funny.save()
            return Response(status=status.HTTP_201_CREATED)