from bar_reviews.serializers.common import BarReviewSerializer
from ..serializers.common import BarSerializer
from events.serializers.common import EventSerializer

class PopulatedBarSerializer(BarSerializer):

    bar_reviews = BarReviewSerializer(many=True)
    events = EventSerializer(many=True)