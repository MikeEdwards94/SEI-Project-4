from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Bar
from .serializers.common import BarSerializer

class BarListView(APIView):

    def get(self, _request):
        bars = Bar.objects.all()
        serialized_bars = BarSerializer(bars, many=True)
        return Response(serialized_bars.data, status=status.HTTP_200_OK)

    def post(self, request):
        bar_to_add = BarSerializer(data=request.data)
        if bar_to_add.is_valid():
            bar_to_add.save()
            return Response(bar_to_add.data, status=status.HTTP_201_CREATED)
        return Response(bar_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class BarDetailView(APIView):

    def get_bar(self, pk):
        try:
            return Bar.objects.get(pk=pk)
        except Bar.DoesNotExist:
            raise NotFound(detail="Cannot find that bar")

    def get(self, _request, pk):
        bar = self.get_bar(pk=pk)
        serialized_bar = BarSerializer(bar)
        return Response(serialized_bar.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        bar_to_delete = self.get_bar(pk=pk)
        bar_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        bar_to_edit = self.get_bar(pk=pk)
        updated_bar = BarSerializer(bar_to_edit, data=request.data)
        if updated_bar.is_valid():
            updated_bar.save()
            return Response(updated_bar.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_bar.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)