from django.db import models
<<<<<<< HEAD
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.html import mark_safe
from django.utils.text import slugify

from shortuuid.django_fields import ShortUUIDField
import shortuuid
# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to="image", null=True, blank=True)
    slug = models.SlugField(unique=True, null=True, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Category"

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Category, self).save(*args, **kwargs)
    
    def post_count(self):
        return Post.objects.filter(category=self).count()

class Post(models.Model):
    STATUS = ( 
        ("Active", "Active"), 
        ("Draft", "Draft"),
        ("Disabled", "Disabled"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to="image", null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tags = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='posts')
    status = models.CharField(max_length=100, choices=STATUS, default="Active")
    view = models.IntegerField(default=0)
    likes = models.ManyToManyField(User, blank=True, related_name="likes_user")
    slug = models.SlugField(unique=True, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Post"

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title) + "-" + shortuuid.uuid()[:2]
        super(Post, self).save(*args, **kwargs)
    
    def comments(self):
        return Comment.objects.filter(post=self).order_by("-id")

    
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    comment = models.TextField()
    reply = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.title} - {self.name}"
    
    class Meta:
        verbose_name_plural = "Comment"


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.title} - {self.user.username}"
    
    class Meta:
        verbose_name_plural = "Bookmark"


class Notification(models.Model):
    NOTI_TYPE = ( ("Like", "Like"), ("Comment", "Comment"), ("Bookmark", "Bookmark"))
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=NOTI_TYPE)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Notification"
    
    def __str__(self):
        if self.post:
            return f"{self.type} - {self.post.title}"
        else:
            return "Notification"
=======
>>>>>>> 52500a8adb76aedf3f5500c50ac55dd9f190c0b4
