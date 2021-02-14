import os
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import validate_image_file_extension

# Create your models here.
from Ono.settings import BASE_DIR


class Community (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(blank=False)

    class Meta:
        verbose_name = "Community"
        verbose_name_plural = "Communities"

    def json_data(self):
        json_data = {
            'id': self.id.__str__(),
            'name': self.name,
            'points': self.calc_points()
        }
        return json_data

    def calc_points(self):
        total = 0
        for purchase in Purchase.objects.filter(community_id=self.id):
            total += purchase.point_amount
        return total


class Restaurant (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(blank=False)
    address = models.TextField(blank=False)
    image = models.ImageField(
        upload_to='restaurants/',
        validators=[validate_image_file_extension], blank=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, null=False)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def json_data(self):
        json_data = {
            'id': self.id.__str__(),
            'name': self.name,
            'address': self.address,
            'image': self.check_file(),
            'community': self.community.json_data(),
            'longitude': self.longitude,
            'latitude': self.latitude
        }
        return json_data

    def check_file(self):
        try:
            return self.image.url
        except ValueError:
            return ''


class Purchase (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    person = models.ForeignKey(User, on_delete=models.PROTECT)
    community = models.ForeignKey(Community, on_delete=models.PROTECT)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT)
    point_amount = models.PositiveIntegerField()

    def json_data(self):
        json_data = {
            'id': self.id.__str__(),
            'name': self.person,
            'community': self.community,
            'restaurant': self.restaurant,
            'point_amount': self.point_amount
        }
        return json_data


class Voucher (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField(blank=False)
    description = models.TextField(blank=False)
    image = models.ImageField(upload_to='vouchers/', validators=[validate_image_file_extension], blank=True)
    location = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def json_data(self):
        json_data = {
            'id': self.id.__str__(),
            'title': self.title,
            'description': self.description,
            'image': self.check_file(),
            'location': self.location.json_data()
        }
        return json_data

    def check_file(self):
        try:
            return self.image.url
        except ValueError:
            return ''
