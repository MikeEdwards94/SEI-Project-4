from jwt_auth.serializers.common import UserSerializer
from .common import EventReviewSerializer

class PopulatedEventReviewSerializer(EventReviewSerializer):
    owner = UserSerializer()