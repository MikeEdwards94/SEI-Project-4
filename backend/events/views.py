from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.populated import PopulatedEventSerializer
from .serializers.common import EventSerializer
from .models import Event

class EventListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        events = Event.objects.all()
        serialized_events = PopulatedEventSerializer(events, many=True)
        return Response(serialized_events.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        event_to_add = EventSerializer(data=request.data)
        if event_to_add.is_valid():
            event_to_add.save()
            return Response(event_to_add.data, status=status.HTTP_201_CREATED)
        return Response(event_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class EventDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_event(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise NotFound(detail="Cannot find that event")

    def get(self, _request, pk):
        event = self.get_event(pk=pk)
        serialized_event = PopulatedEventSerializer(event)
        return Response(serialized_event.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        event_to_delete = self.get_event(pk=pk)
        if event_to_delete.owner != request.user:
            raise PermissionDenied()
        event_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        event_to_edit = self.get_event(pk=pk)
        updated_event = EventSerializer(event_to_edit, data=request.data)
        request.data["owner"] = request.user.id
        if event_to_edit.owner != request.user:
            raise PermissionDenied()
        if updated_event.is_valid():
            updated_event.save()
            return Response(updated_event.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_event.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)