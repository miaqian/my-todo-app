from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),  # 依赖第一个migration
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='date',
            field=models.DateField(null=True, blank=True),  # 添加date字段
        ),
    ]