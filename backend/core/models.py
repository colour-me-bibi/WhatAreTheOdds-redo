from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    token_amount = models.IntegerField(default=0)

    def __str__(self):
        return self.username


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Tags"


class Market(models.Model):
    name = models.CharField(max_length=50)
    rules = models.TextField()
    tags = models.ManyToManyField(Tag, related_name="markets")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Markets"


class Contract(models.Model):
    name = models.CharField(max_length=50)
    market = models.ForeignKey(Market, on_delete=models.CASCADE, related_name="contracts")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Contracts"


class FieldChoice:
    CONTRACT_TYPE = (
        ("Y", "Yes"),
        ("N", "No"),
    )
    OFFER_TYPE = (
        ("B", "Buy"),
        ("S", "Sell"),
    )


class Offer(models.Model):
    share_amount = models.IntegerField()
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    contract_type = models.CharField(max_length=1, choices=FieldChoice.CONTRACT_TYPE)
    offer_type = models.CharField(max_length=1, choices=FieldChoice.OFFER_TYPE)

    contract = models.ForeignKey(Contract, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.contract.name + " - " + self.user.username

    class Meta:
        verbose_name_plural = "Offers"


class Investment(models.Model):
    share_amount = models.IntegerField()
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    contract_type = models.CharField(max_length=1, choices=FieldChoice.CONTRACT_TYPE)
    offer_type = models.CharField(max_length=1, choices=FieldChoice.OFFER_TYPE)

    contract = models.ForeignKey(Contract, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.contract.name + " - " + self.user.username

    class Meta:
        verbose_name_plural = "Investments"
