from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator
from . import business_licenses, community_import
from django.apps import apps
from .models import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import math

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
    pagination = False

    if request.GET.get('page'):
        page = int(request.GET['page'])
        pagination = True
        per_page = 16

    something = {
        "restaurants": []
    }

    try:
        instances = Restaurant.objects.filter(community__name=community_name).order_by('name')
        length = instances.count()
        if length > 0 and pagination:
            pages = int(math.ceil(length/per_page))
            start = (page-1)*per_page
            end = (page*per_page) - 1
            something["pages"] = pages
            for restaurant in instances[start:end]:
                something["restaurants"].append(restaurant.json_data())
        else:
            for restaurant in instances:
                something["restaurants"].append(restaurant.json_data())

    except ObjectDoesNotExist:
        pass

    return JsonResponse(something)
