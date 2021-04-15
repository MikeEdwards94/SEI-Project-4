from bar_reviews.serializers.populated import PopulatedBarReviewSerializer
from ..serializers.common import BarSerializer
from events.serializers.common import EventSerializer
from deals.serializers.populated import PopulatedDealSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedBarSerializer(BarSerializer):

    bar_reviews = PopulatedBarReviewSerializer(many=True)
    events = EventSerializer(many=True)
    deals = PopulatedDealSerializer(many=True)
    owner = UserSerializer()
