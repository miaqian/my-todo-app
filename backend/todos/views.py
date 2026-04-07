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
    serializer_class = HabitLogSerializer

    def get_queryset(self):
        queryset = HabitLog.objects.all()
        date = self.request.query_params.get('date')  # 获取URL里的date参数
        if date:
            queryset = queryset.filter(date=date)     # 按日期过滤
        return queryset


#API核心——增删改查