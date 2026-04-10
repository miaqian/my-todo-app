from rest_framework import viewsets
from .models import Todo, Habit, HabitLog
from .serializers import TodoSerializer, HabitSerializer, HabitLogSerializer

class TodoViewSet(viewsets.ModelViewSet):
    # ModelViewSet gives us the standard REST actions automatically:
    # list, create, retrieve, update, partial_update, and destroy.
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class HabitLogViewSet(viewsets.ModelViewSet):
    queryset = HabitLog.objects.all()
    serializer_class = HabitLogSerializer

    def get_queryset(self):
        # The frontend uses query parameters to ask for:
        # - one day of logs
        # - or a date range for history / streak calculations
        queryset = HabitLog.objects.all()
        date = self.request.query_params.get('date')
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        if date:
            queryset = queryset.filter(date=date)
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        if date_to:
            queryset = queryset.filter(date__lte=date_to)
        return queryset
