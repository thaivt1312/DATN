from .db_connect import connect_to_database

def checkAccount(username):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    query = """SELECT id, password, account_type FROM account WHERE username=%s and is_deleted=%s"""
    params=(username, 0)
    mycursor.execute(query, params)
    
    res = mycursor.fetchone()
    mycursor.reset()
    
    mycursor.close()
    mydb.close()
    if not res:
        return None
    else:
        return res
    
def getAccList(user_id):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """SELECT id, username, account_type FROM account WHERE id!=%s and is_deleted=%s"""
    params=(user_id, 0)
    mycursor.execute(query, params)
    res = mycursor.fetchall()
    mycursor.reset()
    
    mycursor.close()
    mydb.close()
    if not res:
        return []
    else:
        return res
    
def addNewAccount(username, hashcode, account_type):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """INSERT INTO account (username, password, account_type) VALUES (%s, %s, %s)"""
    params=(username, hashcode, account_type)
    mycursor.execute(query, params)
    
    mydb.commit()
    mycursor.close()
    mydb.close()
    
def deleteAccount(username):
    mydb = connect_to_database()
    mycursor = mydb.cursor(buffered=True)
    
    query = """DELETE FROM account WHERE username=%s"""
    params=(username,)
    mycursor.execute(query, params)
    
    mydb.commit()
    mycursor.close()
    mydb.close()