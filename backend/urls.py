from django.contrib import admin
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('view/restaurant/<str:community_name>', views.get_restaurants_in_community),
    path('view/<str:model_name>', views.get_all_data),
    path('view/<str:model_name>/<uuid:model_id>', views.get_data),
    path('create/<str:model_name>', views.create_model),
    path('update/<str:model_name>/<uuid:model_id>', views.update_model),
    path('update_communities', views.update_communities),
    path('update_restaurants', views.update_restaurants),
    path('fuckit', views.imp)
]

