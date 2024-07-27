from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleListView(APIView):
    def get(self, request):
        examples = [
            {"id": 1, "name": "Example 1", "description": "Description 1"},
            {"id": 2, "name": "Example 2", "description": "Description 2"}
        ]
        return Response(examples)


# Create your views here.
