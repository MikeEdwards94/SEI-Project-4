from django.urls import path
from .views import DealListView, DealDetailView

urlpatterns = [
    path('', DealListView.as_view()),
    path('<int:pk>', DealDetailView.as_view())
]