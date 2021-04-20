from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import BarReviewSerializer
from .models import Bar_Review

class BarReviewListView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        request.data["owner"] = request.user.id
        bar_review_to_create = BarReviewSerializer(data=request.data)
        if bar_review_to_create.is_valid():
            bar_review_to_create.save()
            return Response(bar_review_to_create.data, status=status.HTTP_201_CREATED)
        return Response(bar_review_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class BarReviewDetailView(APIView):

    def delete(self, request, pk):
        try:
            bar_review_to_delete = Bar_Review.objects.get(pk=pk)
        except Bar_Review.DoesNotExist:
            raise NotFound()
        if bar_review_to_delete.owner != request.user:
            raise PermissionDenied()
        bar_review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
            
class BarReviewLike(APIView):
    permission_classes = (IsAuthenticated,)


    def get(self, request, pk):
        try:
            bar_reveiew_to_like = Bar_Review.objects.get(pk=pk)
        except Bar_Review.DoesNotExist:
            raise NotFound()
        if request.user in bar_reveiew_to_like.likes.all():
            bar_reveiew_to_like.likes.remove(request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            bar_reveiew_to_like.likes.add(request.user)
            bar_reveiew_to_like.save()
            return Response(status=status.HTTP_201_CREATED)

class BarReviewDislike(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        try:
            bar_reveiew_to_dislike = Bar_Review.objects.get(pk=pk)
        except Bar_Review.DoesNotExist:
            raise NotFound()
        if request.user in bar_reveiew_to_dislike.likes.all():
            bar_reveiew_to_dislike.dislikes.remove(request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            bar_reveiew_to_dislike.dislikes.add(request.user)
            bar_reveiew_to_dislike.save()
            return Response(status=status.HTTP_201_CREATED)

class BarReviewFunny(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        try:
            bar_reveiew_to_funny = Bar_Review.objects.get(pk=pk)
        except Bar_Review.DoesNotExist:
            raise NotFound()
        if request.user in bar_reveiew_to_funny.funny.all():
            bar_reveiew_to_funny.funny.remove(request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            bar_reveiew_to_funny.funny.add(request.user)
            bar_reveiew_to_funny.save()
            return Response(status=status.HTTP_201_CREATED)