from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import DealSerializer
from .models import Deal

class DealListView(APIView):

    def post(self, request):
        deal_to_create = DealSerializer(data=request.data)
        if deal_to_create.is_valid():
            deal_to_create.save()
            return Response(deal_to_create.data, status=status.HTTP_201_CREATED)
        return Response(deal_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class DealDetailView(APIView):

    def delete(self, _request, pk):
        try:
            deal_to_delete = Deal.objects.get(pk=pk)
        except Deal.DoesNotExist:
            raise NotFound()
        deal_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)