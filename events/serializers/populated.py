from .common import EventSerializer
from bars.serializers.common import BarSerializer

class PopulatedEventSerializer(EventSerializer):

    bars = BarSerializer(many=True)