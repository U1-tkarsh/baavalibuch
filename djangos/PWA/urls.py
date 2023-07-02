from django.urls import path
from .views import get_ngrams

urlpatterns = [
    path('api/ngrams/', get_ngrams, name='ngrams'),
]
