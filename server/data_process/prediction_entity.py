from .db_connect import connect_to_database

from .device_entity import getUserInfo

def getListPrediction(userId, fromTime, toTime):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query="""SELECT * FROM predict_data WHERE user_id=%s and time < %s and time > %s order by time desc"""
    params = (userId, toTime, fromTime)
    mycursor.execute(query, params)
    res = mycursor.fetchall()
    
    mycursor.reset()
    mycursor.close()
    mydb.close()
    return res
    
def getLastPrediction(firebaseToken):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    get = getUserInfo(firebaseToken)
    deviceId = get[0]
    userId = get[1]
    query=f"SELECT id, avg_heartbeat, time, latitude, longitude, prediction FROM predict_data WHERE user_id = '{userId}' ORDER BY time DESC LIMIT 1 "
    mycursor.execute(query)
    res = mycursor.fetchone()
    mycursor.reset()
    mycursor.close()
    mydb.close()
    if res:
        recordId = res[0]
        avg_heartbeat = res[1]
        date_time = res[2].strftime("%Y-%m-%d %H:%M:%S")
        # stress_level = res[2]
        latitude = res[3]
        longitude = res[4]
        prediction = res[5]
        return [avg_heartbeat, date_time, latitude, longitude, deviceId, userId, prediction, recordId]
    else:
        return []
    
def updatePrediction(recordId, prediction):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query = """UPDATE predict_data SET prediction=%s WHERE id=%s"""
    mycursor.execute(query, [prediction, recordId])
    mydb.commit()
    mycursor.close()
    mydb.close()
    
def saveHeartRateData(params):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query = """INSERT INTO predict_data 
        (user_id, time, avg_heartbeat, latitude, longitude, prediction) 
        VALUES (%s, %s, %s, %s, %s, %s)"""
    mycursor.execute(query, params)
    mydb.commit()
    mycursor.close()
    mydb.close()