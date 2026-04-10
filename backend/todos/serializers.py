from rest_framework import serializers
from  .models import Todo, Habit, HabitLog

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        # Serializer is the bridge between Django model objects and JSON.
        model = Todo
        fields = ['id', 'title', 'completed', 'created_at', 'date']

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name','created_at']

class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'date']
