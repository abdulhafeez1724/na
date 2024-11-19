from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagsViewSet

# Create a router and register the TagsViewSet with it
router = DefaultRouter()
router.register(r'tags', TagsViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include the router-generated URLs
]
