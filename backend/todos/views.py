from rest_framework import viewsets
from .models import Todo, Habit, HabitLog
from .serializers import TodoSerializer, HabitSerializer, HabitLogSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer  # 习惯的增删改查

class HabitLogViewSet(viewsets.ModelViewSet):
    queryset = HabitLog.objects.all()
    serializer_class = HabitLogSerializer  # 打卡记录的增删改查



#API核心——增删改查