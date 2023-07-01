from rest_framework import serializers
from .models import TextData

class NgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextData
        fields = '__all__'