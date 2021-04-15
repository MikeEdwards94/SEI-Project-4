from .common import EventSerializer
from bars.serializers.common import BarSerializer
from event_reviews.serializers.common import EventReviewSerializer
from ..serializers.common import EventSerializer

class PopulatedEventSerializer(EventSerializer):

    bars = BarSerializer(many=True)
    event_reviews = EventReviewSerializer(many=True)