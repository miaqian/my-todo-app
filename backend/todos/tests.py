from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from rest_framework import status
from .models import Todo

class TodoAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_todo(self):
        response = self.client.post('/api/todos/', {'title': 'Test todo', 'completed': False}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 1)

    def test_get_todos(self):
        Todo.objects.create(title='Test todo', completed=False)
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_delete_todo(self):
        todo = Todo.objects.create(title='Test todo', completed=False)
        response = self.client.delete(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)

    def test_create_todo_with_uploaded_file_content(self):
        upload = SimpleUploadedFile(
            'notes.txt',
            b'hello from file',
            content_type='text/plain',
        )
        response = self.client.post(
            '/api/todos/',
            {'title': 'Imported todo', 'file': upload},
            format='multipart',
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        todo = Todo.objects.get(id=response.data['id'])
        self.assertEqual(todo.file_content, 'hello from file')
        self.assertTrue(todo.uploaded_file.name.endswith('notes.txt'))
