from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Project, LancerProposal, HireApplication

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'role', 'bio', 'phone_number']

class ProjectSerializer(serializers.ModelSerializer):
    client = UserProfileSerializer(read_only=True)
    # lancer = UserProfileSerializer()

    class Meta:
        model = Project
        fields = ['client', 'title', 'description', 'budget', 'deadline']

class LancerProposalSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    client = UserProfileSerializer()
    lancer = UserProfileSerializer()

    class Meta:
        model = LancerProposal
        fields = ['id', 'project', 'client', 'lancer', 'proposal_text', 'proposed_amount', 'proposed_deadline']

class HireApplicationSerializer(serializers.ModelSerializer):
    lancer = UserProfileSerializer(read_only=True)

    class Meta:
        model = HireApplication
        fields = ['lancer', 'pitch', 'created_at']