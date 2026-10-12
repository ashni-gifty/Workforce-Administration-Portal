#import required libraries
#import serializers module
from rest_framework import serializers 
#import all the models that we created so far
from .models import Employee, Department, UserDetails, Project
#also import the built-in User model from django
from django.contrib.auth.models import User, Group
import re
from django.contrib.auth.hashers import make_password #fn to encrypt password

#create a serializer for signup/registration of the user
#during signup automatically assign the user to a group
#if the group doesn't exist, then create a group
#save the user and also create a token for the user automatically
class SignupSerializer(serializers.ModelSerializer):
    #step1: add a custom field for group name
    group_name = serializers.CharField(write_only=True,required=False)
    #this field will be used only for saving the user, so write only
    #user can be saved without this field also, so required false

    #step2: override the 'create' method to handle custom user registration 
    def create(self, validated_data):
        #validated_data will be receiving the details for signup send via API
        #the details include username, password, groupname(optional)
        #since djangoRF does not allow user creation and group assignment at once
        #we have to keep the groupname aside, create the user and then assign the group
        #save the group_name if exists from the validated_data, else save None
        #then remove the "group_name" field from validated_data
        self.group_name = validated_data.pop("group_name",None)
        #since the default create was hashing/encrypting the password, we also have to
        validated_data["password"] = make_password(validated_data.get("password"))
        #now we are all set to save/create the user
        #call the create() method of the super class/parent of SignupSerializer
        #the parent of SignupSerializer is ModelSerializer
        user = super(SignupSerializer, self).create(validated_data)
        #now we can add the created user to the group
        #if group is sent, then add user to the group. 
        #if the sent group does not exist, then create the group
        if self.group_name:
            group, created = Group.objects.get_or_create(name=self.group_name)
            #add the user that we created to the group
            user.groups.add(group)
        return user
    
    class Meta:
        model = User
        fields = ['username','password','group_name']
    
#Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField() 
    #field to get username from and send username to user
    password = serializers.CharField(write_only=True) 
    #field to get password from and not send it
    class Meta:
        model = User
        fields = ['username','password']      


#create serializers for the models that we created
#create DepartmentSerializer class by inheriting ModelSerializer
class DepartmentSerializer(serializers.ModelSerializer):
    #provide another nested class called Meta
    #Meta class will contain the Meta data (demographic)
    class Meta:
        model = Department
        fields = '__all__'

#create a small serializer just to provide project
#details (id and name) to the employee serializer
class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        #we need only selected fields
        fields = ('id','name')

#create seperate functions for validation and later
#include them in the respective serializer
def name_length_validation(employeeName):
    if len(employeeName)<5:
        raise serializers.ValidationError("Name should be at least 5 chars!!")
    return employeeName

def name_format_validation(employeeName):
    if not re.match("^[A-Za-z]+$",employeeName):
        raise serializers.ValidationError("Name should be alphabetic chars!!")
    return employeeName

class EmployeeSerializer(serializers.ModelSerializer):
    #EmployeeName = serializers.CharField(max_length=150, 
    #     validators=[name_length_validation, name_format_validation])

    #display dept name for each employee
    '''
    #create a read-only field
    #so that we dont have to send it during post/put/patch
    #but we will have that field during get request
    DepartmentName = serializers.CharField(
        source="DepartmentId.DepartmentName",
        read_only=True
    )
    #DepartmentId is the FK field used in Employee model
    '''
    #if you want deptid and deptname as a nested json
    #inside the employee json, get the entire dept serializer
    #and display it as a read only nested json
    department = DepartmentSerializer(
        source="DepartmentId",
        read_only=True
        #DepartmentId is the FK field used in Employee model
    )
    #FOR READ - FOR GET REQUEST
    #create instance of the small serializer that we created
    #make sure to use the related name 'projects' for the 
    #employee-project relation used in the model
    projects = ProjectListSerializer(many=True,read_only=True)
    #include validation functions

    class Meta:
        model = Employee
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        #fields = ('id','username')

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'

#create a small serializer just to provide employee
#details (empid and empname) to the project serializer
class EmployeeProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        #we need only selected fields
        fields = ('EmployeeId','EmployeeName')

class ProjectSerializer(serializers.ModelSerializer):
    #create an instance of the EmployeeProjectSerializer
    #to add it as a read-only nestedview
    #so that when creating project, pass only empid not empname
    employee_details = EmployeeProjectSerializer(
        source='employees', many=True, read_only=True)
    class Meta:
        model = Project
        #fields='__all__' will work, but the order will differ
        fields = ('id','name','employees','employee_details')
        