# Generated by Django 5.0.7 on 2024-08-01 01:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diddle', '0004_project_lancerproposal'),
    ]

    operations = [
        migrations.AddField(
            model_name='lancerproposal',
            name='client',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='client_proposals', to='diddle.userprofile'),
        ),
        migrations.AddField(
            model_name='project',
            name='lancer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lancer_projects', to='diddle.userprofile'),
        ),
        migrations.AlterField(
            model_name='lancerproposal',
            name='lancer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lancer_proposals', to='diddle.userprofile'),
        ),
        migrations.AlterField(
            model_name='lancerproposal',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proposals', to='diddle.project'),
        ),
        migrations.AlterField(
            model_name='project',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_projects', to='diddle.userprofile'),
        ),
    ]
