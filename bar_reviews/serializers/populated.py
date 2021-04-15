from jwt_auth.serializers.common import UserSerializer
from .common import BarReviewSerializer

class PopulatedBarReviewSerializer(BarReviewSerializer):
    owner = UserSerializer()