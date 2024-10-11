from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('user/', include('account.urls')),
    path('blog/', include('blog.urls')),
]
