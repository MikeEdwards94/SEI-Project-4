from django.urls import path
from .views import BarReviewListView, BarReviewDetailView, BarReviewLike, BarReviewDislike, BarReviewFunny

urlpatterns = [
    path('', BarReviewListView.as_view()),
    path('<int:pk>/likes/', BarReviewLike.as_view()),
    path('<int:pk>/dislikes/', BarReviewDislike.as_view()),
    path('<int:pk>/funny/', BarReviewFunny.as_view()),
    path('<int:pk>', BarReviewDetailView.as_view())
]