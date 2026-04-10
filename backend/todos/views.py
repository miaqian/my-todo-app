from rest_framework import viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from .models import Todo, Habit, HabitLog
from .serializers import TodoSerializer, HabitSerializer, HabitLogSerializer


def extract_text_from_upload(uploaded_file):
    if not uploaded_file:
        return ''

    uploaded_file.seek(0)
    raw_bytes = uploaded_file.read()
    uploaded_file.seek(0)

    for encoding in ('utf-8-sig', 'utf-16', 'latin-1'):
        try:
            return raw_bytes.decode(encoding)
        except UnicodeDecodeError:
            continue

    return raw_bytes.decode('utf-8', errors='replace')

class TodoViewSet(viewsets.ModelViewSet):
    # ModelViewSet gives us the standard REST actions automatically:
    # list, create, retrieve, update, partial_update, and destroy.
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_create(self, serializer):
        uploaded_file = self.request.FILES.get('file') or self.request.FILES.get('uploaded_file')
        file_content = extract_text_from_upload(uploaded_file)
        serializer.save(file_content=file_content)

    def perform_update(self, serializer):
        uploaded_file = self.request.FILES.get('file') or self.request.FILES.get('uploaded_file')
        file_content = serializer.instance.file_content
        if uploaded_file:
            file_content = extract_text_from_upload(uploaded_file)
        serializer.save(file_content=file_content)

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
