from config.FCMManage import sendNotification 
from datetime import datetime

firebaseTokenArr = []

def getIndex(user_id):
    print(firebaseTokenArr)
    for i in range(len(firebaseTokenArr)):
        if firebaseTokenArr[i]['user_id'] == user_id:
            return i
    return -1

def addNew(user_id, firebaseToken):
    firebaseTokenArr.append({
        "user_id": user_id,
        "firebase_token": firebaseToken
    })
    print(firebaseTokenArr)

def updateFirebaseToken(user_id, firebaseToken):
    index = getIndex(user_id)
    if index == -1:
        addNew(user_id, firebaseToken)
    else:
        firebaseTokenArr[index] = {
            "user_id": user_id,
            "firebase_token": firebaseToken
        }
    print(firebaseTokenArr)

def getFirebaseToken(user_id):
    index = getIndex(user_id)
    if index == -1:
        return ""
    else:
        return firebaseTokenArr[index]['firebase_token']
    
def sendToUser(user_id, msg):
    index = getIndex(user_id)
    print(user_id, msg, index)
    if index == -1:
        return "User not login"
    else:
        token = firebaseTokenArr[index]['firebase_token']
        print(token, user_id, msg)
        return sendNotification('send', msg + ' at ' + datetime.now().strftime("%Y-%m-%d %H:%M:%S"), [token])
