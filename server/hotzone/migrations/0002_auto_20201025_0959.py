# Generated by Django 3.1.2 on 2020-10-25 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotzone', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='x_coord',
            field=models.FloatField(verbose_name='X Co-ordinate'),
        ),
        migrations.AlterField(
            model_name='location',
            name='y_coord',
            field=models.FloatField(verbose_name='Y Co-ordinate'),
        ),
    ]
