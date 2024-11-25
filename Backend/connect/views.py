from rest_framework.views import APIView
from rest_framework.response import Response
from .models import*
from random import sample
from rest_framework import status
from .serializers import *

class SavePreferences(APIView):
    def post(self, request):
        serializer = UserPreferencesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)

            # Add user to queues
            LocationQueue.objects.create(user=request.user, location=serializer.validated_data['location'])
            LanguageQueue.objects.create(user=request.user, language=serializer.validated_data['language'])
            
            return Response({"message": "Preferences saved"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MatchUsers(APIView):
    def get(self, request):
        location_users = LocationQueue.objects.values_list('user', flat=True)
        language_users = LanguageQueue.objects.values_list('user', flat=True)
        
        # Find intersection of users in both queues
        matched_users = set(location_users) & set(language_users)
        if len(matched_users) >= 2:
            matched_users = sample(list(matched_users), 2)  # Pick 2 random users
            return Response({"users": matched_users})
        return Response({"message": "No match found"})

class WebRTCSignaling(APIView):
    def post(self, request):
        serializer = CallSignalingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(caller=request.user, status='PENDING')
            return Response({"call_id": serializer.instance.id, "message": "Offer sent"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, call_id):
        call = CallSignaling.objects.get(id=call_id)
        sdp_answer = request.data.get('sdp_answer')
        call.sdp_answer = sdp_answer
        call.status = 'CONNECTED'
        call.save()
        return Response({"message": "Answer sent"}, status=status.HTTP_200_OK)

class AddIceCandidate(APIView):
    def post(self, request):
        serializer = IceCandidateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "ICE candidate added"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetIceCandidates(APIView):
    def get(self, request, call_id):
        call = CallSignaling.objects.get(id=call_id)
        candidates = IceCandidate.objects.filter(call=call).exclude(user=request.user).values('candidate')
        return Response({"candidates": list(candidates)})

