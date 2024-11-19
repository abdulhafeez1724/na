from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagsViewSet

router = DefaultRouter()
router.register(r'tags', TagsViewSet)


urlpatterns = [
    path('tags/', include(router.urls)),
]
