from rest_framework import viewsets, filters, permissions, status
#coz we are going to create views based on viewsets
from .models import Department,User,UserDetails,Employee,Project
from .serializers import SignupSerializer, LoginSerializer, ProjectSerializer,DepartmentSerializer, EmployeeSerializer,UserSerializer,UserDetailsSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.contrib.auth import authenticate

# Create your views here.

# Creating a highly customized SignupAPIView by inheriting the APIView class
class SignupAPIView(APIView):
    #signup should be accesible to all users without authorization
    permission_classes = [permissions.AllowAny]
    #define our own custom post function to handle registration/signup
    def post(self,request):
        #create an instance of the respective serializer class
        serializer = SignupSerializer(data=request.data)
        #if the user creation was succesfull in SignupSerializer
        #serializer object will be valid
        if serializer.is_valid():
            #in that case save the user using the serializer
            user = serializer.save()
            #and get the created token
            refresh = RefreshToken.for_user(user)
            #design the json response to the sent back on succesful user creation
            return Response({
                "user_id":user.id,
                "username":user.username,
                "access":str(refresh.access_token),
                "refresh":str(refresh),
                "role":user.groups.all()[0].id if user.groups.exists() else None
            },status.HTTP_201_CREATED)
        else:
            return Response({'status':status.HTTP_400_BAD_REQUEST,
                             'data':serializer.errors},
                             status.HTTP_400_BAD_REQUEST);

            
# Creating a highly customized SignupAPIView by inheriting the APIView class
class LoginAPIView(APIView):
    #login should be accesible to all users without authorization
    permission_classes = [permissions.AllowAny]
    #define our own custom post function to handle login
    def post(self,request):
        #create an instance of the respective serializer class
        serializer = LoginSerializer(data=request.data)
        #serializer object will be valid
        if serializer.is_valid():
            #get the username and password from data and try custom authentication
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            #try to authenticate using authenticate() fn
            user = authenticate(request, username=username, password=password)
            #if successfuly validated, authenticate() fn will return a valid user obj else None
            if user is not None:
                #get the token of the valid user and send it along with json response
                refresh = RefreshToken.for_user(user)
                response = {
                    "status":status.HTTP_200_OK,
                    "message":"success",
                    "username":user.username,
                    "access":str(refresh.access_token),
                    "refresh":str(refresh),
                    "role":user.groups.all()[0].id if user.groups.exists() else None
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {"status":status.HTTP_401_UNAUTHORIZED,
                            "message":"So Sorry !!!! Invalid username or password"
                }
                return Response(response, status=status.HTTP_401_UNAUTHORIZED)
        
        #if all the above return statements didnt trigger, then:
        return Response({'status':status.HTTP_400_BAD_REQUEST,
                            'message':'got this',
                             'data':serializer.errors},
                             status.HTTP_400_BAD_REQUEST);
          



#create DepartmentViewSet class by inheriting 
# ModelViewSet from viewsets module
class DepartmentViewSet(viewsets.ModelViewSet):
    #create a queryset object from the model
    #to retirieve all the objects of the class
    #also define the serializer class
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    #to bypass the permission for login 
    #permission_classes = []


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    #add search functionality for Employee
    filter_backends = [filters.SearchFilter]
    search_fields = ['EmployeeName','Designation']
    #to bypass the permission for login 
    permission_classes = []

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #to bypass the permission for login 
    permission_classes = []

class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    #to bypass the permission for login 
    permission_classes = []

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    #to bypass the permission for login 
    permission_classes = []