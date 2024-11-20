from rest_framework.viewsets import ModelViewSet
from .models import Tags
from .serializers import TagsSerializer
from rest_framework.permissions import IsAuthenticated

class TagsViewSet(ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer
    permission_classes = [IsAuthenticated]
