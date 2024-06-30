from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from common.function import hash_password
from common.web_firebase_token import updateFirebaseToken

from config.msg import ACCOUNT_EXISTS, ACCOUNT_NOT_FOUND, WRONG_PASSWORD, LOGIN_SUCCESS, REGISTER_SUCCESS, UNAUTHORIZED

from common.auth_token import create_token
    
from data_process.account_entity import addNewAccount, checkAccount

class LoginApi(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        
        username = data.get('username')
        password = data.get('password')
        
        res = checkAccount(username)
        
        print(res)
        if not res:
            response = {
                "msg": ACCOUNT_NOT_FOUND,
                "success": False
            }
        else:
            print(res[1], password)
            hashcode = hash_password(password)
            if hashcode == res[1]:
                token = create_token(res[0], res[2])
                if res[2] == 0:
                    firebaseToken = data.get('firebaseToken')
                    updateFirebaseToken(res[0], firebaseToken)
                    response = {
                        "msg": LOGIN_SUCCESS,
                        "data": {
                            "user_token": token,
                        },
                        "success": True
                    }
                else:
                    response = {
                        "msg": LOGIN_SUCCESS,
                        "data": {
                            "admin_token": token,
                        },
                        "success": True
                    }
            else:
                response = {
                    "msg": WRONG_PASSWORD,
                    "success": False
                }
        print(response)
        return Response(response, status=status.HTTP_200_OK)
    
class registerApi(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        
        user = checkAccount(username)
        print(user)
        if not user:
            hashcode = hash_password(password)
            addNewAccount(username, hashcode, 0)

            response = {
                "msg": REGISTER_SUCCESS,
                "success": True
            }
        else:
            response = {
                "msg": ACCOUNT_EXISTS,
                "success": False
            }
        return Response(response, status=status.HTTP_200_OK)