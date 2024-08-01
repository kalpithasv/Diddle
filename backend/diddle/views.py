from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Project, LancerProposal
from .serializers import ProjectSerializer, LancerProposalSerializer



class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def signup(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')
        bio = request.data.get('bio')
        phone_number = request.data.get('phone_number')
        
        if username and password and role:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                user = User.objects.create(
                    username=username,
                    password=make_password(password)
                )
                # Create UserProfile and associate with the user
                user_profile = UserProfile.objects.create(
                    user=user,
                    role=role,
                    bio=bio,
                    phone_number=phone_number
                )
                return Response({'status': 'User created'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': 'Error creating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            try:
                user_profile = UserProfile.objects.get(user=user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_profile': UserProfileSerializer(user_profile).data
                }, status=status.HTTP_200_OK)
            except UserProfile.DoesNotExist:
                return Response({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def profile(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'status': 'Logout successful'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': 'Error logging out'}, status=status.HTTP_400_BAD_REQUEST)
        
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user.userprofile)

class LancerProposalViewSet(viewsets.ModelViewSet):
    queryset = LancerProposal.objects.all()
    serializer_class = LancerProposalSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(lancer=self.request.user.userprofile)
