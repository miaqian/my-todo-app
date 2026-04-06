from rest_framework import serializers
from  .models import Todo 

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'completed', 'created_at', 'date']
        
#这个文件的作用是把数据库里的Todo对象转换成JSON，react才能读取