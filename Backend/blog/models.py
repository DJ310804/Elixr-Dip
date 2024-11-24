from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag, related_name="blog_posts", blank=True)
    # media = models.JSONField(blank=True,null=True)  # For media files
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Section(models.Model):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="sections")
    title = models.CharField(max_length=255)
    content = models.TextField()

# class Media(models.Model):
#     MEDIA_TYPES = [
#         ('audio', 'Audio'),
#         ('video', 'Video'),
#         ('gif', 'GIF'),
#     ]
#     blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="media")
#     type = models.CharField(max_length=10, choices=MEDIA_TYPES)
#     url = models.URLField()
#     description = models.CharField(max_length=255, blank=True, null=True)
