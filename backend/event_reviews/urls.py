from django.urls import path
from .views import EventReviewListView, EventReviewDetailView, EventReviewLike, EventReviewDislike, EventReviewFunny

urlpatterns = [
    path('', EventReviewListView.as_view()),
    path('<int:pk>/likes/', EventReviewLike.as_view()),
    path('<int:pk>/dislikes/', EventReviewDislike.as_view()),
    path('<int:pk>/funny/', EventReviewFunny.as_view()),
    path('<int:pk>', EventReviewDetailView.as_view())
]