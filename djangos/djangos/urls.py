from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('ngrams', views.ngrams, name='ngrams'),
    path('', include('PWA.urls'))
]
