from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth.hashers import make_password

class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def signup(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            user = User.objects.create(
                username=username,
                password=make_password(password)
            )
            return Response({'status': 'User created'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            user_profile = UserProfile.objects.get(user=user)
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)