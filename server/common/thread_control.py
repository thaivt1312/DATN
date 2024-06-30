

threadArr = []

def updateThread(userId, action):
    (curIndex, check) = findThreadIndex(userId)
    if check:
        threadArr[curIndex] = {
            'index': int(userId),
            'isNew': True,
            't': action
        }
    else:
        appendNew(userId, action)
    return (curIndex, check)

def appendNew(newUserId, action):
    threadArr.append({
        'index': newUserId,
        'isNew': True,
        't': action
    })

def stopThread(userId):
    (curIndex, check) = findThreadIndex(userId)
    if check:
        threadArr[curIndex]['t'].cancel()
    return (curIndex, check)

def findThreadIndex(userId):
    curIndex = 0
    check = False
    for x in threadArr:
        if x['index'] == int(userId):
            check = True
            break
        curIndex = curIndex + 1
    return [curIndex, check]

def isNewThread(userId):
    (curIndex, check) = findThreadIndex(userId)
    if check:
        return threadArr[curIndex]['isNew']
    else:
        return True
    
def setIsNewThread(userId, isNew):
    (curIndex, check) = findThreadIndex(userId)
    if check:
        threadArr[curIndex]['isNew'] = isNew