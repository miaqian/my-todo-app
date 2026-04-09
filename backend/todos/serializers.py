from rest_framework import serializers
from  .models import Todo, Habit, HabitLog

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'completed', 'created_at', 'date']

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name','created_at'] #x习惯的字段

class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'date']
#这个文件的作用是把数据库里的Todo对象转换成JSON，react才能读取
