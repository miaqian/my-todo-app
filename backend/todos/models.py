from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title 
    
    #这个文件是Django用来定义数据结构的地方，在Django里，model就是在告诉程序-要存什么数据
    #-每条数据有哪些字段-每条字段是什么类型-这些数据最后会怎么存进数据库