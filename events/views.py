from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedEventSerializer
from .models import Event

class EventListView(APIView):

    def get(self, _request):
        events = Event.objects.all()
        serialized_events = PopulatedEventSerializer(events, many=True)
        return Response(serialized_events.data, status=status.HTTP_200_OK)
