from django.shortcuts import render

from . import business_licenses, community_import
from django.apps import apps
from .models import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.


def get_data(request, model_name, model_id):
    instance = apps.get_model('backend', model_name).objects.get(id=model_id)
    return JsonResponse(instance.json_data())


def get_all_data(request, model_name):
    instances = apps.get_model('backend', model_name).objects.all()

    something = {
        model_name: []
    }
    for instance in instances:
        something[model_name].append(instance.json_data())

    return JsonResponse(something)


@csrf_exempt
def create_model(request, model_name):
    content = json.loads(request.body)['content']
    print(content)

    if(model_name == "purchase"):
        content["person_id"] = request.user.id




    instance = apps.get_model('backend', model_name).objects.create(**content)

    instance.full_clean()
    instance.save()

    return JsonResponse(instance.json_data())


@csrf_exempt
def update_model(request, model_name, model_id):
    content = json.loads(request.body)['content']

    instance = apps.get_model('backend', model_name).objects.get(id=model_id)

    for attr, value in content.items():
        setattr(instance, attr, value)

    instance.full_clean()
    instance.save()

    return JsonResponse(instance.json_data())

def imp(request):
    return HttpResponse("sup")


def update_communities(request):
    community_import.update_communities_in_database()
    return HttpResponse('Updated communities')


def update_restaurants(request):
    business_licenses.add_restaurants_to_database()
    return HttpResponse('Updated restaurants')


def get_restaurants_in_community(request, community_name):
    community_instance = Community.objects.get(name=community_name)
    instances = Restaurant.objects.filter(community=community_instance)

    something = {
        "restaurants": []
    }

    for instance in instances:
        something["restaurants"].append(instance.json_data())

    return JsonResponse(something)
