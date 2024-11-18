from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tags
from .serializers import TagsSerializer

class TagsListView(APIView):
    def get(self, request):
        tags = Tags.objects.all()
        serializer = TagsSerializer(tags, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serlializer = TagsSerializer(data=request.data)
        if serlializer.is_valid():
            serlializer.save()
            return Response(serlializer.data, status=status.HTTP_201_CREATED)
        return Response(serlializer.errors, status=status.HTTP_400_BAD_REQUEST) 