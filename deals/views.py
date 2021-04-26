from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import DealSerializer
from .serializers.populated import PopulatedDealSerializer
from .models import Deal

class DealListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        deals = Deal.objects.all()
        serialized_deals = PopulatedDealSerializer(deals, many=True)
        return Response(serialized_deals.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        deal_to_create = DealSerializer(data=request.data)
        if deal_to_create.is_valid():
            deal_to_create.save()
            return Response(deal_to_create.data, status=status.HTTP_201_CREATED)
        return Response(deal_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class DealDetailView(APIView):

    def delete(self, request, pk):
        try:
            deal_to_delete = Deal.objects.get(pk=pk)
        except Deal.DoesNotExist:
            raise NotFound()
        if deal_to_delete.owner != request.user:
            raise PermissionDenied()
        deal_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)