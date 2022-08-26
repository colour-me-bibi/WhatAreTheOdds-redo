from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView
from rest_framework.routers import DefaultRouter

from .views import (InvestmentGenericViewSet, MarketViewSet,
                    OfferGenericViewSet, get_reddit_search,
                    get_token_tindr, post_token_tindr, get_portfolio)

router = DefaultRouter()
router.register(r"markets", MarketViewSet, basename="markets")
router.register(r"offers", OfferGenericViewSet, basename="offers")
router.register(r"investments", InvestmentGenericViewSet, basename="investments")

urlpatterns = [
    path("admin/", admin.site.urls),

    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),

    path("token_tindr/", get_token_tindr, name="token_tindr_get"),
    path("token_tindr/<str:image_id>/", post_token_tindr, name="token_tindr_post"),

    path("reddit/search/<str:term>/", get_reddit_search, name="reddit_search"),

    path("portfolio/", get_portfolio, name="portfolio"),

    path("", include(router.urls)),
]
