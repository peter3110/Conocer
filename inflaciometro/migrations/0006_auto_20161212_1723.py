# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-12-12 17:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inflaciometro', '0005_auto_20161212_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datausuario',
            name='aumentoAlimentos',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='aumentoTransporte',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoAlimentos',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoEducacion',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoEsparcimiento',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoHogar',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoIndumentaria',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoOtros',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoSalud',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoTransporte',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='datausuario',
            name='gastoViviendaYServicios',
            field=models.FloatField(default=0, null=True),
        ),
    ]
