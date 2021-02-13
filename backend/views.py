from django.shortcuts import render
from .models import *
from django.http import HttpResponse

# Create your views here.


def get_restaurant(request, restaurant_id):
    restaurant = Restaurant.objects.get(id=restaurant_id)
    return restaurant.json_data()


def imp(request):
    return HttpResponse("sup")



