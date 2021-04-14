from django.urls import path
from .views import BarReviewListView, BarReviewDetailView

urlpatterns = [
    path('', BarReviewListView.as_view()),
    path('<int:pk>', BarReviewDetailView.as_view())
]