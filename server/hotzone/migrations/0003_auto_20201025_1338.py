# Generated by Django 3.1.2 on 2020-10-25 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotzone', '0002_auto_20201025_0959'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='location',
        ),
        migrations.AddField(
            model_name='location',
            name='name',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]