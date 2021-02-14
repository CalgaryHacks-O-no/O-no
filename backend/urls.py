from django.contrib import admin
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('view/<str:model_name>', views.get_all_data),
    path('view/<str:model_name>/<uuid:restaurant_id>', views.get_data),
    path('update_communities', views.update_communities),
    path('update_restaurants', views.update_restaurants),
]

