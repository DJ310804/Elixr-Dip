from rest_framework import serializers
from .models import BlogPost

# class TagSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Tag
#         fields = ['id', 'name']

# class SectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Section
#         fields = ['id', 'title', 'content']

# class MediaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Media
#         fields = ['id', 'type', 'url', 'description']

class BlogPostSerializer(serializers.ModelSerializer):
    # tags = TagSerializer(many=True)
    # sections = SectionSerializer(many=True)
    # media = MediaSerializer(many=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
