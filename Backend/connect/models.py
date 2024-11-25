from django.db import models
from account.models import User

class UserPreferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    language = models.CharField(max_length=100)

class LocationQueue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)

class LanguageQueue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language = models.CharField(max_length=100)

class CallSignaling(models.Model):
    caller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='caller')
    callee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='callee')
    sdp_offer = models.TextField()
    sdp_answer = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('PENDING', 'Pending'), ('CONNECTED', 'Connected')])

class IceCandidate(models.Model):
    call = models.ForeignKey(CallSignaling, on_delete=models.CASCADE, related_name='ice_candidates')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    candidate = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
