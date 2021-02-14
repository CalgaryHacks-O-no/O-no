from django.shortcuts import render

from django.apps import apps
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.


def get_data(request,model_name, model_id):
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



