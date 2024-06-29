from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.http import FileResponse
from django.core.files import File
from pathlib import Path
from datetime import datetime, timedelta

from common.function import send_to_stresswatch2, send_to_stresswatch3

from .sound_process.index import load_sound_model, run_sound_predict, save_sound_prediction, save_sound_file

from common.web_firebase_token import sendToUser
from common.auth_token import validateToken
from common.active_code import generate_passcode, verify_passcode
from common.thread_control import updateThread, isNewThread, stopThread, setIsNewThread
from common.interval import setInterval
from common.constant import intervalTime

from data_process.device_entity import checkDeviceInfo, getActiveStatus, getUserInfo, activeDevice, getCarerIdByUserId, getListDevice, getDeviceDetail, updateUserInformation, deactiveDevice
from data_process.prediction_entity import getLastPrediction, saveHeartRateData, getListPrediction

from config.FCMManage import sendPush
from config.msg import ACTIVE_SUCCESS

load_sound_model()

def startRunning(userId, firebaseToken):
    def action():
        record = getLastPrediction(firebaseToken)
        print(record)
        if len(record) > 0:
            avg_heartbeat = record[0]
            date_time = record[1]
            latitude = record[2]
            longitude = record[3]
            deviceId = record[4]
            prediction = record[6]
            date_time1 = datetime.strptime(date_time, "%Y-%m-%d %H:%M:%S")
            userId = record[5]
            if isNewThread(userId):
                if abs(datetime.now() - date_time1) > timedelta(minutes=2):
                    stopThread(userId)
                    newPrediction = "Smart watch has been disconnected, last prection is: " + prediction + ", at " + date_time + "."
                    print ("\n" + newPrediction + ".\n")
        
                    healthData2 = {
                        "user_id": "01hw37jjx5c74az9e786k50nvc",
                        "stress_level": 0,
                        "datetime": date_time,
                        "latitude": latitude,
                        "longitude": longitude,
                        "average_heart_rate": avg_heartbeat,
                        "device_id": deviceId,
                        "prediction": newPrediction,
                        "step_count": 0,
                    }
        
                    healthData3 = {
                        "client_secret": "N1rB1JetZs9IEzP",
                        "grant_type": "password",
                        "client_id": "stress_watch_1_test",
                        "smartWatchId": deviceId,
                        "stressLevel": 0,
                        "datetime": date_time,
                        "latitude": latitude,
                        "longitude": longitude,
                        "averageHeartRate": avg_heartbeat,
                        "prediction": newPrediction,
                        "stepCount": 0,
                        "soundFile": 'No file available',
                    }
                    # send_to_stresswatch2(healthData2)
                    # send_to_stresswatch3(healthData3)
                    return
        sendPush('get', 'getHRData', [firebaseToken])
    action()
    updateThread(userId, setInterval(intervalTime, action))
    
# Create your views here.
class getDeviceListView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        print(user_data)
        if user_data:
            user_id = user_data['user_id']
            account_type = user_data['account_type']
            arr = getListDevice(user_id, account_type)
            # print(arr)
            res = []
            for item in arr:
                firebase_token = item[3]
                lastPredict = getLastPrediction(firebase_token)
                if len(lastPredict) == 0:
                    prediction = ""
                else:
                    prediction = lastPredict[6]
                res.append({
                    'user_id': item[0],
                    'device_id': item[2],
                    'user_information': item[5],
                    'is_active': item[6],
                    'is_running': item[7],
                    'last_predict': prediction
                })
            # print(res)
            response = {
                "data": res,
                "success": True
            }
        else: 
            response = {
                "msg": "Token not valid",
                "data": '',
                "success": False,
            }
        return Response(response, status=status.HTTP_200_OK)
    
class getDetail(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        if user_data:
            account_type = user_data['account_type']
            id = data.get('id')
            carer_id = user_data['user_id']
            test_carer_id = getCarerIdByUserId(id)[1]
            if test_carer_id != carer_id and account_type == 0:
                response = {
                    "msg": "Token not valid",
                    "data": '',
                    "success": False,
                }
            else:
                fromTime = data.get('from')
                toTime = data.get('to')
                device_data = getDeviceDetail(id)
                print(device_data)
                
                predictionList = getListPrediction(id, fromTime, toTime)
                # arr = getListDevice(user_id, account_type)
                # print(predictionList)
                arr = []
                for item in predictionList:
                    arr.append({
                        'prediction': item[3],
                        "time": item[6],
                    })
                response = {
                    "data": {
                        'device_id': device_data[2],
                        "device_information": device_data[4],
                        'user_information': device_data[5],
                        "predictions": arr
                    },
                    "success": True
                }
                
        else: 
            response = {
                "msg": "Token not valid",
                "data": '',
                "success": False,
            }
        return Response(response, status=status.HTTP_200_OK)
     
class editUserInformation(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        if user_data:
            information = data.get('information')
            userId = data.get('id')
            print(userId, information)
            updateUserInformation(userId, information)
            response = {
                "msg": "User information updated successfully",
                "data": '',
                "success": True
            }
        else:
            response = {
                "msg": "Token not valid",
                "data": '',
                "success": False,
            }
        return Response(response, status=status.HTTP_200_OK)

class generatePasscode(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        user_id = user_data.get('user_id')
        passcode = generate_passcode(user_id)
        response = {
            "passcode": passcode,
            "success": True
        }
        return Response(response, status=status.HTTP_200_OK)
    
class verifyPasscode(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        code = data.get('passcode')
        deviceId = data.get('deviceId')
        userId = verify_passcode(code)
        print(userId)
        if not userId:
            response = {
                'msg' : 'Code not valid',
                "data": '',
                "success": False,
            }
        else:
            activeDevice(deviceId, userId)
            sendToUser(userId, ACTIVE_SUCCESS)
            response = {
                'msg' : 'Active successfully',
                "data": '',
                "success": True,
            }
        
        return Response(response, status=status.HTTP_200_OK)

class activeCode(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        deviceId = data.get('deviceId')
        # firebase_token = data.get('firebaseToken')
        check = getActiveStatus(deviceId)
        
        response = {
            'msg' : str(check),
            "data": "",
            "success": True,
        }
        return Response(response, status=status.HTTP_200_OK)
    
class checkDevice(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        firebaseToken = data.get('firebaseToken')
        deviceId = data.get('deviceId')
        deviceInformation = data.get('deviceInformation')
        print(data)
        
        check = checkDeviceInfo(deviceId, firebaseToken, deviceInformation)
        if not check:
            response = {
                'msg' : '0',
                "data": "",
                "success": True,
            }
            
        else:
            [user_id, carer_id, is_active] = check
            print(user_id, carer_id, is_active)
            if is_active == 1:
                startRunning(user_id, firebaseToken)
            else:
                stopThread(user_id)
            response = {
                'msg' : str(is_active),
                "data": "",
                "success": True,
            }
        
        return Response(response, status=status.HTTP_200_OK)

class stopRunning(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        deviceId = data.get('deviceId')
        firebaseToken = data.get('firebaseToken')
        user_data = getUserInfo(firebaseToken)
        stopThread(user_data[1])
        response = {
            'msg' : "",
            "data": "",
            "success": True,
        }
        return Response(response, status=status.HTTP_200_OK)
        
class deactiveDeviceAPI(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        if user_data:
            user_id = user_data.get('user_id')
            id = data.get('id')
            carer_id = getCarerIdByUserId(id)[1]
            if user_id != carer_id:
                response = {
                    "msg": "Token not valid",
                    "data": '',
                    "success": False,
                }
            else:
                deviceId = data.get('deviceId')
                deactiveDevice(deviceId)
                response = {
                    "msg": "Device deactivated successfully",
                    "data": '',
                    "success": True
                }
        else: 
            response = {
                "msg": "Token not valid",
                "data": '',
                "success": False,
            }
        return Response(response, status=status.HTTP_200_OK)
        
class HRVDataAPI(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print (data)
        heartBeatData = data.get('heartBeatData')
        firebaseToken = data.get('firebaseToken')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        
        print(heartBeatData, firebaseToken, longitude, latitude)
        
        get = getUserInfo(firebaseToken)
        # deviceId = get[0]
        userId = get[1]
        avgHeartBeat = 0
        hrsum = 0
        string = heartBeatData[1:len(heartBeatData)-1]
        if (len(string)):
            arr = string.split(", ")
            for x in arr:
                y = float(x)
                hrsum += y
            avgHeartBeat = hrsum/len(arr)
        avgHeartBeat = round(avgHeartBeat, 2)
        sendPush('get', 'getRecord', [firebaseToken])
        if avgHeartBeat > 0:
            prediction = "Average heart beat is " + str(avgHeartBeat) + "."
        else:
            prediction = "Cannot get heart beat data."

        if latitude == "" or longitude == "":
            latitude = None
            longitude = None
            prediction = prediction + " Cannot get position data."
        else:
            latitude = float(latitude)
            longitude = float(longitude)
            
        params=(
            userId, 
            datetime.now(), 
            avgHeartBeat,
            latitude,
            longitude,
            prediction
        )
        saveHeartRateData(params)
        setIsNewThread(userId, False)
        response = {
            "msg": "",
            "data": "",
            "success": True,
        }
        
        return Response(response, status=status.HTTP_200_OK)
    
class SoundDataAPI(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        
        response = request.FILES.get('file').name
        file = request.FILES.get('file')
        mypath = Path().absolute()
        
        firebaseToken = data.get('firebaseToken')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        file_path = save_sound_file(firebaseToken, file)
        print(file_path)
        predictions = run_sound_predict(mypath/file_path, firebaseToken)
        record = save_sound_prediction(predictions, firebaseToken)
        
        avg_heartbeat = record[0]
        date_time = record[1]
        deviceId = record[2]
        prediction = record[3]
        userId = record[4]
        carer_id = getCarerIdByUserId(userId)[1]
        
        sendToUser(carer_id, prediction)
        
        # print(prediction)
        
        healthData2 = {
            "user_id": "01hw37jjx5c74az9e786k50nvc",
            "stress_level": 0,
            "datetime": date_time,
            "latitude": latitude,
            "longitude": longitude,
            "average_heart_rate": avg_heartbeat,
            "device_id": deviceId,
            "prediction": prediction,
            "step_count": 0,
        }
        # print(healthData2)
        # send_to_stresswatch2(healthData2, False)
        
        healthData3 = {
            "client_secret": "N1rB1JetZs9IEzP",
            "grant_type": "password",
            "client_id": "stress_watch_1_test",
            "smartWatchId": deviceId,
            "stressLevel": 0,
            "datetime": date_time,
            "latitude": latitude,
            "longitude": longitude,
            "averageHeartRate": avg_heartbeat,
            "prediction": prediction,
            "stepCount": 0,
            # "soundFile": file,
        }
        # send_to_stresswatch3(healthData3, False)
        
        response = {
            "msg": "",
            "data": "",
            "success": True,
        }
        
        return Response(response, status=status.HTTP_200_OK)
    
class getSoundFile(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        if user_data:
            account_type = user_data['account_type']
            id = data.get('id')
            carer_id = user_data['user_id']
            test_carer_id = getCarerIdByUserId(id)[1]
            if test_carer_id != carer_id and account_type == 0:
                response = {
                    "msg": "Token not valid",
                    "data": '',
                    "success": False,
                }
            else:
                date = data.get('date')
                time = data.get('time')
                id = data.get('id')
                mypath = Path().absolute()
                file_path = 'storage/' + str(id) + '/' + date + '/' + time + ".wav"
                try: 
                    # open(mypath/file_path, 'rb')
                    return FileResponse(open(mypath/file_path, 'rb'), as_attachment=True)
                except:
                    response = {
                        "msg": "File not found",
                        "data": '',
                        "success": False,
                    }
                    return Response(response, status=status.HTTP_404_NOT_FOUND)
                
        else: 
            response = {
                "msg": "Token not valid",
                "data": '',
                "success": False,
            }
        return Response(response, status=status.HTTP_200_OK)
        