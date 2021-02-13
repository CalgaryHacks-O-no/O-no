from django.shortcuts import render

from . import business_licenses
from .models import *
from django.http import HttpResponse

# Create your views here.


def get_restaurant(request, restaurant_id):
    restaurant = Restaurant.objects.get(id=restaurant_id)
    return restaurant.json_data()


def update_communities(request):
    business_licenses.add_communities_to_database()



