# Generated by Django 5.1 on 2024-11-24 19:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_accessibilityneed_user_has_accessibility_needs_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='accessibilityneed',
            options={'verbose_name': 'Accessibility Need', 'verbose_name_plural': 'Accessibility Needs'},
        ),
    ]