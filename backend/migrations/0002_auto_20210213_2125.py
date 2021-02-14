# Generated by Django 3.1.6 on 2021-02-14 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='location',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='community',
            name='sector',
            field=models.CharField(default='', max_length=32),
            preserve_default=False,
        ),
    ]
