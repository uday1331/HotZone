# Generated by Django 3.1.2 on 2020-11-22 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotzone', '0006_auto_20201122_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='address',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]
