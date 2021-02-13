import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Community (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(blank=False)


class Restaurant (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(blank=False)
    address = models.TextField(blank=False)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, null=False)
    longitude = models.FloatField()
    latitude = models.FloatField()


class Purchase (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    person = models.ForeignKey(User, on_delete=models.PROTECT)
    community = models.ForeignKey(Community, on_delete=models.PROTECT)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT)
    point_amount = models.PositiveIntegerField()
