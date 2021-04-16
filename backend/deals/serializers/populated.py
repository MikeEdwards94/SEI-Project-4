from jwt_auth.serializers.common import UserSerializer
from .common import DealSerializer

class PopulatedDealSerializer(DealSerializer):
    owner = UserSerializer()