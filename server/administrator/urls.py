from .views import accountApi, getAccountList
from django.urls import path

urlpatterns = [
    path("account/", accountApi.as_view()),
    path("account/list/", getAccountList.as_view()),
]