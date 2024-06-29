from .views import checkDevice, HRVDataAPI, SoundDataAPI, generatePasscode, verifyPasscode, getDeviceListView, getDetail, editUserInformation, stopRunning, deactiveDeviceAPI

from django.urls import path

urlpatterns = [
    
    path("checkDevice/", checkDevice.as_view()),
    path("getPasscode/", generatePasscode.as_view()),
    path("post/hrData/", HRVDataAPI.as_view()),
    path("post/record/", SoundDataAPI.as_view()),
    path("verifyPasscode/", verifyPasscode.as_view()),
    path("getListDevice/", getDeviceListView.as_view()),
    path("getDetail/", getDetail.as_view()),
    path("editUserInformation/", editUserInformation.as_view()),
    path("stopRunning/", stopRunning.as_view()),
    path("deactiveDevice/", deactiveDeviceAPI.as_view()),
    
]