from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField(null=True, blank=True)

class Habit(models.Model):
    name = models.CharField(max_length=200)        # 习惯名称，比如"喝水"
    created_at = models.DateTimeField(auto_now_add=True)  # 创建时间

    def __str__(self):
        return self.name

class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)  # 关联哪个习惯
    date = models.DateField()                                    # 哪一天打卡
    
    class Meta:
        unique_together = ['habit', 'date']  # 同一个习惯同一天只能打卡一次

    def __str__(self):
        return f"{self.habit.name} - {self.date}"
    
    #这个文件是Django用来定义数据结构的地方，在Django里，model就是在告诉程序-要存什么数据
    #-每条数据有哪些字段-每条字段是什么类型-这些数据最后会怎么存进数据库
