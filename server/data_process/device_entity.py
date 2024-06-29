from .db_connect import connect_to_database

def getUserInfo(firebaseToken):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query="SELECT device_id, id as user_id FROM device WHERE firebase_token = %s AND id <> %s"
    params=(firebaseToken, 0)
    mycursor.execute(query, params)
    
    res = mycursor.fetchone()
    mycursor.reset()
    mycursor.close()
    mydb.close()
    return res

def getActiveStatus(deviceId):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """SELECT is_active FROM device WHERE device_id=%s"""
    params=(deviceId,)
    mycursor.execute(query, params)
    res = mycursor.fetchone()
    mycursor.reset()
    mycursor.close()
    mydb.close()
    
    if not res:
        return 0
    else:
        return res[0]
    
def updateFirebaseToken(deviceId, firebaseToken):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """UPDATE device SET firebase_token=%s WHERE device_id=%s"""
    params=(firebaseToken, deviceId)
    mycursor.execute(query, params)
    mydb.commit()
    
    mycursor.close()
    mydb.close()
    
def addNewDevice(deviceId, deviceInformation, firebaseToken, isActive):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """INSERT INTO device (device_id, device_information, firebase_token, is_active) VALUES (%s, %s, %s, %s)"""
    params=(deviceId, deviceInformation, firebaseToken, isActive)
    mycursor.execute(query, params)
    mydb.commit()
    
    mycursor.close()
    mydb.close()
    
def activeDevice(deviceId, userId):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """UPDATE device SET carer_id=%s, is_active=%s, is_running=1 WHERE device_id=%s"""
    params=(userId, 1, deviceId)
    mycursor.execute(query, params)
    mydb.commit()
    
    mycursor.close()
    mydb.close()
    
def deactiveDevice(deviceId, resetInformation = False):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    if resetInformation == True:
        query = """UPDATE device SET device_information=%s, user_information=%s, is_active=0, is_running=0 WHERE device_id=%s"""
        params=("", "", deviceId)
    else:
        query = """UPDATE device SET is_active=0, is_running=0 WHERE device_id=%s"""
        params=(deviceId,)
    mycursor.execute(query, params)
    mydb.commit()
    
    mycursor.close()
    mydb.close()
    
def getListDevice(userId, accountType):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    if accountType == 0:
        query = """SELECT * FROM device WHERE carer_id=%s"""
        params=(userId,)
        mycursor.execute(query, params)
    else:
        query = """SELECT * FROM device"""
        mycursor.execute(query)
    
    res = mycursor.fetchall()
    mycursor.reset()
    
    mycursor.close()
    mydb.close()
    if not res:
        return []
    else:
        return res
    
def updateDeviceInformation(deviceId, deviceInformation):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """UPDATE device SET device_information=%s WHERE device_id=%s"""
    params=(deviceInformation, deviceId)
    mycursor.execute(query, params)
    mydb.commit()
        
    mycursor.close()
    mydb.close()
    
def updateUserInformation(userId, userInformation):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """UPDATE device SET user_information=%s WHERE id=%s"""
    params=( userInformation, userId)
    mycursor.execute(query, params)
    mydb.commit()
        
    mycursor.close()
    mydb.close()
    
def updateRunningStatus(deviceId, isRunning):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """UPDATE device SET is_running=%s WHERE device_id=%s"""
    params=(isRunning, deviceId)
    mycursor.execute(query, params)
    mydb.commit()
        
    mycursor.close()
    mydb.close()
    
def checkDeviceInfo(deviceId, firebaseToken, deviceInformation):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query="SELECT id as user_id, carer_id, is_active FROM device WHERE device_id = %s AND id <> %s"
    params=(deviceId, 0)
    mycursor.execute(query, params)
    res = mycursor.fetchone()
    mycursor.reset()
    mycursor.close()
    mydb.close()
    if not res:
        addNewDevice(deviceId, firebaseToken, deviceInformation, 0)
        print("\nInsert new user success\n")
        return None
    else:
        updateFirebaseToken(deviceId, firebaseToken)
        updateDeviceInformation(deviceId, deviceInformation)
        print("\nUpdate firebase token success\n")
        return res
    
def getCarerIdByUserId(userId):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query="SELECT device_id, carer_id FROM device WHERE id = %s"
    params=(userId, )
    mycursor.execute(query, params)
    
    res = mycursor.fetchone()
    mycursor.reset()
    mycursor.close()
    mydb.close()
    return res
    
def getDeviceDetail(userId):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query="SELECT * FROM device WHERE id = %s"
    params=(userId,)
    mycursor.execute(query, params)
    
    res = mycursor.fetchone()
    mycursor.reset()
    mycursor.close()
    mydb.close()
    return res