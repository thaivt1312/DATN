from .views import LoginApi, registerApi#, deviceApi
from django.urls import path

urlpatterns = [
    path("login/", LoginApi.as_view()),
    path("register/", registerApi.as_view()),
    # path("device/", deviceApi.as_view()),
]