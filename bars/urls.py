from django.urls import path
from .views import BarListView, BarDetailView


urlpatterns = [
    path('', BarListView.as_view()),
    path('<int:pk>/', BarDetailView.as_view())
]