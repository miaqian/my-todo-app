from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, HabitViewSet, HabitLogViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)
router.register(r'habits', HabitViewSet)#habit's API
router.register(r'habitlogs',HabitLogViewSet)#打卡记录的API


urlpatterns =[
    path('', include(router.urls)),
]