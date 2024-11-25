from rest_framework import serializers
from .models import *

class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = ['user', 'location', 'language']

class LocationQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationQueue
        fields = ['user', 'location']

class LanguageQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageQueue
        fields = ['user', 'language']

class CallSignalingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallSignaling
        fields = ['caller', 'callee', 'sdp_offer', 'sdp_answer', 'status']

class IceCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IceCandidate
        fields = ['call', 'user', 'candidate', 'timestamp']
