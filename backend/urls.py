from django.contrib import admin
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('restaurant/<uuid:onjID>', views.get_restaurant),
    path('fuckit', views.imp)
]

