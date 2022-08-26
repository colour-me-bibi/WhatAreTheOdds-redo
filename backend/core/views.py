import praw
import requests
from rest_framework import mixins, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response

from .models import Investment, Market, Offer
from .serializers import (InvestmentSerializer, MarketSerializer,
                          OfferSerializer)


class MarketViewSet(viewsets.ModelViewSet):
    """TODO"""

    queryset = Market.objects.all()
    serializer_class = MarketSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


CAT_API_KEY = "22a7f9c0-af15-476e-9c7c-f30472ebc61e"


class CAT_API:
    GET_URL = "https://api.thecatapi.com/v1/images/search?limit=2&api_key={}".format(CAT_API_KEY)
    POST_URL = "https://api.thecatapi.com/v1/votes?api_key={}".format(CAT_API_KEY)


class REDDIT_API:
    CLIENT_ID = '-lZhAkqDrbiBC2arQKcu8A'
    SECRET_TOKEN = '5OWpa9SkGPLbK6p65kdLTR9DgUCoNw'
    USER_AGENT = 'WhatAreTheOdds/0.0.1'


REDDIT_CLIENT = None


@api_view(['GET'])
def get_reddit_search(request, term):
    """TODO"""

    global REDDIT_CLIENT
    if REDDIT_CLIENT is None:
        print("Initializing Reddit client...")
        REDDIT_CLIENT = praw.Reddit(
            client_id=REDDIT_API.CLIENT_ID,
            client_secret=REDDIT_API.SECRET_TOKEN,
            user_agent=REDDIT_API.USER_AGENT,
        )

    print(f"Searching reddit for {term}...")
    api_response = REDDIT_CLIENT.subreddit('all').search(term.lower(), limit=10)

    print("Loading reddit search results...")
    return Response({
        "term": term,
        "submissions": [{
            "author": submission.author.name,
            "created_utc": submission.created_utc,
            "edited": submission.edited,
            "over_18": submission.over_18,
            "permalink": submission.permalink,
            "score": submission.score,
            "selftext": submission.selftext,
            "subreddit": submission.subreddit.display_name,
            "title": submission.title,
            "upvote_ratio": submission.upvote_ratio,
            "url": submission.url,
        } for submission in api_response],
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_token_tindr(request):
    """TODO"""

    api_response = requests.get(CAT_API.GET_URL).json()

    return Response({
        "one": {
            "id": api_response[0]["id"],
            "image_url": api_response[0]["url"],
        },
        "two": {
            "id": api_response[1]["id"],
            "image_url": api_response[1]["url"],
        },
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_token_tindr(request, image_id):
    """TODO"""

    api_response = requests.post(CAT_API.POST_URL, json={
        "image_id": image_id,
        "value": 1,
        "sub_id": request.user.username,
    })

    # add 100 tokens to user's account
    print("Adding 100 tokens to user's account")
    user = request.user
    user.token_amount += 100
    user.save()
    print("Added 100 tokens to user's account", user)

    print("Response from voting is ", api_response.json())  # TODO maybe remove this

    return Response({"message": "ok"})


class OfferGenericViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """TODO"""

    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    # def create(self, request):
    #     user = request.user

    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)

    #     return Response(serializer.data, status=201, headers=headers)


class InvestmentGenericViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """TODO"""

    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
def get_portfolio(request):
    user = request.user

    pending_offers = Offer.objects.filter(user=user.id)
    current_investments = Investment.objects.filter(user=user.id)

    # TODO calculations

    return Response({  # TODO user PortfolioSerializer
        "username": user.username,
        "pending_offers": OfferSerializer(pending_offers, many=True).data,
        "current_investments": InvestmentSerializer(current_investments, many=True).data,
    })
