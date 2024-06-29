
import random
import string

passcodeArr = []

def findIndexById(userId):
    for i, item in enumerate(passcodeArr):
        if item["userId"] == userId:
            return i
    return -1

def generate_passcode(userId, length=5):
    characters = string.ascii_letters + string.digits
    passcode = ''.join(random.choice(characters) for _ in range(length))
    index = findIndexById(userId)
    if index == -1:
        passcodeArr.append({
            "userId": userId,
            "passcode": passcode
        })
    else:
        passcodeArr[index]["passcode"] = passcode
    return passcode

def verify_passcode(passcode):
    print(passcodeArr, passcode)
    for item in passcodeArr:
        if item["passcode"] == passcode:
            return item["userId"]
    return None

def remove_passcode(userId):
    for i, item in enumerate(passcodeArr):
        if item["userId"] == userId:
            del passcodeArr[i]
            return True
    return False