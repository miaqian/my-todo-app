from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_todo_date'),  # 依赖上一个migration
    ]

    operations = [
        migrations.CreateModel(
            name='Habit',
            fields=[
                ('id', models.AutoField(primary_key=True)),
                ('name', models.CharField(max_length=200)),      # 习惯名称
                ('created_at', models.DateTimeField(auto_now_add=True)),  # 创建时间
            ],
        ),
        migrations.CreateModel(
            name='HabitLog',
            fields=[
                ('id', models.AutoField(primary_key=True)),
                ('date', models.DateField()),                     # 打卡日期
                ('habit', models.ForeignKey(                      # 关联Habit
                    on_delete=django.db.models.deletion.CASCADE,
                    to='todos.habit'
                )),
            ],
            options={
                'unique_together': {('habit', 'date')},          # 同一习惯同一天只能打卡一次
            },
        ),
    ]