# Generated by Django 3.1.6 on 2021-02-13 22:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('address', models.TextField()),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.community')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('point_amount', models.PositiveIntegerField()),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend.community')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend.restaurant')),
            ],
        ),
    ]