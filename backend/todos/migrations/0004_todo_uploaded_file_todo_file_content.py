from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0003_habit_habitlog'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='file_content',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='todo',
            name='uploaded_file',
            field=models.FileField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]
