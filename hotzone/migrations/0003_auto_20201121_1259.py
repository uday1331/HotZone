# Generated by Django 3.1.2 on 2020-11-21 12:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hotzone', '0002_auto_20201120_1236'),
    ]

    operations = [
        migrations.RenameField(
            model_name='case',
            old_name='infected',
            new_name='virus',
        ),
    ]