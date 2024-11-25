from django.contrib import admin
from .models import BlogPost
# from .models import  Bookmark, Notification

admin.site.register(BlogPost)

# Register the Category model with basic settings
# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ('title', 'slug', 'post_count')
#     search_fields = ('title',)
#     prepopulated_fields = {'slug': ('title',)}

# Register the Post model with basic settings
# @admin.register(Post)
# class PostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'user', 'category', 'status', 'date', 'view')
#     search_fields = ('title', 'description')
#     list_filter = ('status', 'category', 'date')
#     prepopulated_fields = {'slug': ('title',)}

# Register the Comment model with basic settings
# @admin.register(Comment)
# class CommentAdmin(admin.ModelAdmin):
#     list_display = ('post', 'email', 'comment', 'date')
#     search_fields = ('email', 'comment')

# Register the Bookmark model with basic settings
# @admin.register(Bookmark)
# class BookmarkAdmin(admin.ModelAdmin):
#     list_display = ('user', 'post', 'date')
#     search_fields = ('user__email', 'post__title')

# # Register the Notification model with basic settings
# @admin.register(Notification)
# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ('user', 'post', 'type', 'seen', 'date')
#     search_fields = ('user__email', 'post__title')
#     list_filter = ('type', 'seen', 'date')
