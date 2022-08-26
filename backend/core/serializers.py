
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework.serializers import ModelSerializer, IntegerField, Serializer, SerializerMethodField, PrimaryKeyRelatedField

from .models import Contract, CustomUser, Investment, Market, Offer, Tag

from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer


class CustomRegisterSerializer(RegisterSerializer):
    token_amount = IntegerField(required=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['token_amount'] = self.validated_data.get('token_amount', 0)
        return data_dict


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('token_amount',)


class TagSerializer(ModelSerializer):
    """TODO"""

    class Meta:
        model = Market
        fields = ['name']


class ContractSerializer(ModelSerializer):
    """TODO"""

    class Meta:
        model = Market
        fields = ["id", 'name']


class MarketSerializer(ModelSerializer):
    """TODO"""

    tags = TagSerializer(many=True)
    contracts = ContractSerializer(many=True)

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        contracts_data = validated_data.pop('contracts')

        market = Market.objects.create(**validated_data)

        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_data['name'])
            market.tags.add(tag)

        for contract_data in contracts_data:
            Contract.objects.create(name=contract_data['name'], market=market)

        return market

    def update(self, instance, validated_data):  # TODO I have no idea if this works
        tags_data = validated_data.pop('tags')
        contracts_data = validated_data.pop('contracts')

        instance.tags.clear()
        instance.contracts.clear()

        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_data['name'])
            instance.tags.add(tag)

        for contract_data in contracts_data:
            Contract.objects.create(name=contract_data['name'], market=instance)

        return instance

    class Meta:
        model = Market
        fields = '__all__'


class OfferSerializer(ModelSerializer):
    """TODO"""

    contract = PrimaryKeyRelatedField(queryset=Contract.objects.all())
    user = PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Offer
        fields = "__all__"


class InvestmentSerializer(ModelSerializer):
    """TODO"""

    # TODO maybe add value calculated field

    class Meta:
        model = Investment
        fields = ("share_amount", "price", "created_at", "contract_type", "offer_type", "contract", "user")


class PortfolioSerializer(Serializer):
    """TODO"""

    user = CustomUserDetailsSerializer()
    pending_offers = OfferSerializer(many=True)
    current_investments = InvestmentSerializer(many=True)

    # ~~~ Calculated fields ~~~
    total_investment_value = SerializerMethodField('get_total_investment_value')

    def get_total_investment_value(self, portfolio):
        return sum(
            (investment.share_amount * investment.price for investment in portfolio.current_investments),
            start=0,
        )
