from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet  
from .views import ProjectViewSet, LancerProposalViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'lancer_proposals', LancerProposalViewSet, basename='lancerproposal')

urlpatterns = [
    path('', include(router.urls)),
]