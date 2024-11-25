from django.urls import path
from .views import SavePreferences, MatchUsers, WebRTCSignaling, AddIceCandidate, GetIceCandidates

urlpatterns = [
    path('save-preferences/', SavePreferences.as_view(), name='save-preferences'),
    path('match-users/', MatchUsers.as_view(), name='match-users'),
    path('webrtc-signaling/', WebRTCSignaling.as_view(), name='webrtc-signaling'),
    path('add-ice-candidate/', AddIceCandidate.as_view(), name='add-ice-candidate'),
    path('get-ice-candidates/<int:call_id>/', GetIceCandidates.as_view(), name='get-ice-candidates'),
]
