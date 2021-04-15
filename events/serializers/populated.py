from .common import EventSerializer
from bars.serializers.common import BarSerializer
from event_reviews.serializers.populated import PopulatedEventReviewSerializer
from ..serializers.common import EventSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedEventSerializer(EventSerializer):

    bars = BarSerializer(many=True)
    event_reviews = PopulatedEventReviewSerializer(many=True)
    owner = UserSerializer()