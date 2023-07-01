from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views



router = routers.DefaultRouter()
router.register('ngrams', views.TodoView, 'PWA')


urlpatterns = [
    path('api/', include(router.urls)),
]