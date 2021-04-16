from django.urls import path
from .views import EventReviewListView, EventReviewDetailView

urlpatterns = [
    path('', EventReviewListView.as_view()),
    path('<int:pk>', EventReviewDetailView.as_view())
]