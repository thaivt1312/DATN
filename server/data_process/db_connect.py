import mysql.connector

def connect_to_database():
    mydb = mysql.connector.connect(
        host = "localhost",
        port = "3306",
        user = "root",
        password = "root",
        database = "hrv_db"
    )
    
    return mydb