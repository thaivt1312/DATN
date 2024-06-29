from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from common.function import hash_password
from common.auth_token import validateToken

from config.msg import ACCOUNT_EXISTS, ACCOUNT_NOT_FOUND, REGISTER_SUCCESS, UNAUTHORIZED, DELETE_ACCOUNT_SUCCESS

from data_process.account_entity import checkAccount, getAccList, addNewAccount, deleteAccount

class getAccountList(APIView):
    def post(self, request, *args, **kwargs):
        BearerToken = request.headers.get('Authorization')
        user_data = validateToken(BearerToken)
        if not user_data:
            response = {
                "msg": UNAUTHORIZED,
                "success": False
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED, content_type='application/json')
        user_id = user_data.get('user_id')
        account_type = user_data.get('account_type')
        
        print(account_type)
        
        
        if not user_id:
            response = {
                "msg": UNAUTHORIZED,
                "success": False
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED, content_type='application/json')
        
        else:
            if account_type == 0:
                response = {
                    "msg": UNAUTHORIZED,
                    "success": False
                }
                return Response(response, status=status.HTTP_200_OK, content_type='application/json')
            
            else:
                
                res = getAccList(user_id)
                
                response = {
                    "data": map(
                        lambda x: {
                            "id": x[0],
                            "username": x[1],
                            "account_type": x[2]
                        }, 
                        res
                    ),
                    "success": True
                }
                return Response(response, status=status.HTTP_200_OK, content_type='application/json')
class accountApi(APIView):
    # add new account
    def post(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_id = validateToken(BearerToken)
        if not user_id:
            response = {
                "msg": UNAUTHORIZED,
                "success": False
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            username = data.get('username')
            password = data.get('password')
            account_type = data.get('accountType')
            
            user = checkAccount(username)
            print(user)
            if not user:
                hashcode = hash_password(password)
                addNewAccount(username, hashcode, account_type)
    
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
        
    # delete account
    def delete(self, request, *args, **kwargs):
        data = request.data
        BearerToken = request.headers.get('Authorization')
        user_id = validateToken(BearerToken)
        if not user_id:
            response = {
                "msg": UNAUTHORIZED,
                "success": False
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            username = data.get('username')
            user = checkAccount(username)
            if user:
                deleteAccount(username)
                
                response = {
                    "msg": DELETE_ACCOUNT_SUCCESS,
                    "success": True
                }
            else:
                response = {
                    "msg": ACCOUNT_NOT_FOUND,
                    "success": False
                }
            return Response(response, status=status.HTTP_200_OK)        