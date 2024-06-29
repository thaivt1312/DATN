
from pathlib import Path
from datetime import datetime
import requests
import hashlib

from common.interval import setInterval

def hash_password(password):
   password_bytes = password.encode('utf-8')
   hash_object = hashlib.sha256(password_bytes)
   return hash_object.hexdigest()

def send_to_stresswatch2(healthData, isFakeData = False):
    def action():
        fakeData1 = {
            "user_id": "01hw37jjx5c74az9e786k50nvc",
            "stress_level": 1,
            "datetime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "latitude": 21.3051452,
            "longitude": 105.434903,
            "average_heart_rate": 83.35,
            "device_id": '646f7d3b6ae430fe',
            "prediction": "Stress level low, average heart rate is 84. No dangerous predicted in audio.",
            "step_count": 0,
        }
        mobileResponse = requests.post('http://222.252.10.203:32311/v1/stressdata', data = fakeData1)
        print (mobileResponse.content)
    if isFakeData:
        action()
        run=setInterval(45, action)
    else:
        mobileResponse = requests.post('http://222.252.10.203:32311/v1/stressdata', data = healthData)
        print (mobileResponse.content)
    
def send_to_stresswatch3(healthData, isFakeData = False):
    def action():
        fakeData2 = {
            "client_secret": "N1rB1JetZs9IEzP",
            "grant_type": "password",
            "client_id": "stress_watch_1_test",
            "smartWatchId": "01hw37jjx5c74az9e786k50nvc",
            "stressLevel": 1,
            "dateTime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "latitude": 21.3051452,
            "longitude": 105.434903,
            "averageHeartRate": 83.35,
            "prediction": "Stress level low, average heart rate is 83.35. No dangerous predicted in audio.",
            "stepCount": 0,
            "soundFile": "no file yet"
        }
        mobileResponse = requests.post('https://daily-sound-peacock.ngrok-free.app/sw1/add_notify', json = fakeData2)
        print (mobileResponse.content)
        
    if isFakeData:
        action()
        run=setInterval(45, action)
    else:
        mobileResponse = requests.post('https://daily-sound-peacock.ngrok-free.app/sw1/add_notify', json = healthData)
        print (mobileResponse.content)