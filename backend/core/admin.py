from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Contract, CustomUser, Investment, Market, Offer, Tag

admin.site.register(CustomUser, UserAdmin)

# TODO maybe export using __init__.py in order easily import only the stuff we want
for model in [Contract, Market, Tag, Offer, Investment]:
    admin.site.register(model)
