from django.shortcuts import render

from django.apps import apps
from .models import *
from django.http import HttpResponse, JsonResponse

# Create your views here.


def get_data(request,model_name, restaurant_id):
    instance = apps.get_model('backend', model_name).objects.get(id=restaurant_id)
    return JsonResponse(instance.json_data())


def get_all_data(request, model_name):
    instances = apps.get_model('backend', model_name).objects.all()

    something = {
        model_name: []
    }
    for instance in instances:
        something[model_name].append(instance.json_data())

    return JsonResponse(something)

def imp(request):
    return HttpResponse("sup")



