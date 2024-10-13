from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'bookmarks', views.BookmarkViewSet, basename='bookmark')
router.register(r'notifications', views.NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
]

# Additional custom URLs for actions that aren't covered by the default router
urlpatterns += [
    path('posts/<slug:slug>/add_comment/', views.PostViewSet.as_view({'post': 'add_comment'}), name='post-add-comment'),
    path('posts/<slug:slug>/toggle_like/', views.PostViewSet.as_view({'post': 'toggle_like'}), name='post-toggle-like'),
    path('comments/<int:pk>/add_reply/', views.CommentViewSet.as_view({'post': 'add_reply'}), name='comment-add-reply'),
    path('notifications/<int:pk>/mark_as_seen/', views.NotificationViewSet.as_view({'post': 'mark_as_seen'}), name='notification-mark-as-seen'),
]