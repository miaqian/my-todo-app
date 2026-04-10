from rest_framework import serializers
from  .models import Todo, Habit, HabitLog

class TodoSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True, required=False, allow_null=True)

    class Meta:
        # Serializer is the bridge between Django model objects and JSON.
        model = Todo
        fields = [
            'id',
            'title',
            'completed',
            'created_at',
            'date',
            'uploaded_file',
            'file_content',
            'file',
        ]
        read_only_fields = ['file_content']

    def validate(self, attrs):
        uploaded_file = attrs.get('file') or attrs.get('uploaded_file')
        if uploaded_file and not attrs.get('title'):
            attrs['title'] = uploaded_file.name
        return attrs

    def create(self, validated_data):
        file_obj = validated_data.pop('file', None)
        if file_obj:
            validated_data['uploaded_file'] = file_obj
        return super().create(validated_data)

    def update(self, instance, validated_data):
        file_obj = validated_data.pop('file', None)
        if file_obj:
            validated_data['uploaded_file'] = file_obj
        return super().update(instance, validated_data)

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name','created_at']

class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'date']
