from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExampleViewSet, ExampleListView  # Ensure this matches your views.py

router = DefaultRouter()
router.register(r'examples', ExampleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Alternatively, use the list view if you don't have a viewset
    path('list/', ExampleListView.as_view(), name='example-list'),
]


