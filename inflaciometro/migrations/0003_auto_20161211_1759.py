# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-12-11 17:59
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inflaciometro', '0002_auto_20161211_1759'),
    ]

    operations = [
        migrations.RenameField(
            model_name='datausuario',
            old_name='aumentoAlimento',
            new_name='aumentoAlimentos',
        ),
        migrations.RenameField(
            model_name='datausuario',
            old_name='gastoAlimento',
            new_name='gastoAlimentos',
        ),
    ]
