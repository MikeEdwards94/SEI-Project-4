from jwt_auth.serializers.common import UserSerializer
from .common import DealSerializer
from bars.serializers.common import BarSerializer

class PopulatedDealSerializer(DealSerializer):
    owner = UserSerializer()
    bar = BarSerializer()