from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NgramSerializer
from .models import TextData

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = NgramSerializer
    queryset = TextData.objects.all()


