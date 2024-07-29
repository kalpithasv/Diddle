from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import ExampleModel  # Ensure you have a model to work with
from .serializers import ExampleSerializer  # Ensure you have a serializer

# Define your ExampleViewSet here if it doesn't exist
class ExampleViewSet(viewsets.ModelViewSet):
    queryset = ExampleModel.objects.all()
    serializer_class = ExampleSerializer

# Alternatively, a simple APIView for basic testing
class ExampleListView(APIView):
    def get(self, request):
        examples = [
            {"id": 1, "name": "Example 1", "description": "Description 1"},
            {"id": 2, "name": "Example 2", "description": "Description 2"}
        ]
        return Response(examples)

