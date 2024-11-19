from rest_framework.viewsets import ModelViewSet
from .models import Tags
from .serializers import TagsSerializer

class TagsViewSet(ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer
