from django.db import models
from django.contrib.auth.models import User #the built in django User class

# Create your models here.
# create model for department by inheriting 
# Models class inside models module
class Department(models.Model):
    #AutoField class is used to to create an auto incrementing field
    #pass primary_key=True to the AutoField class's constructor
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=150) #string/char field
    #to list the dept name instead of the object name
    #this will return the department name when you try to print the object
    def __str__(self):
        return self.DepartmentName


#create model for Employee
class Employee(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=150)
    Designation = models.CharField(max_length=150)
    DateOfJoining = models.DateField()
    DepartmentId = models.ForeignKey(Department, on_delete=models.CASCADE)
    #eg of direct relation since the refered model contains the 
    #relationship field DepartmentId
    #on_delete=models.CASCADE means if a department is deleted
    #then all the employees under that department will be automatically deleted
    Contact = models.CharField(max_length=150)
    IsActive = models.BooleanField(default=True)
    def __str__(self):
        return self.EmployeeName

#create model to store more User details
#just to demonstrate one to one relation of userdetails with user
class UserDetails(models.Model):
    #an one-to-one field mapping the User model built in to django
    #we are not storing a single field here. its the user's complete instance
    #refering via a reverse relationship with the User model
    #related_name gives a name for the reverse relationship
    user = models.OneToOneField(User, on_delete=models.CASCADE, 
                                related_name='user_details')
    #In reverse relationship , the model will not be having the relationsip
    #field in the refered class 'User'
    #using 'user_details' related name which is the accessor that can be 
    #used to naviate back to User Object
    #if 'user_details' is not provided, then django will automatically 
    #assign a related name to access back the User Object
    PhoneNo = models.CharField(max_length=25)
    email = models.EmailField() #field specific for email
    def __str__(self):
        return self.user.username

#model for project
#to demonstrate many to many relationship
#one employee can have multiple projects. Multiple employee can be
#assinged to one project
class Project(models.Model):
    #for a many to many relationship model, we cannot explicity define
    #an id field. Django will be refering to the default id field
    #it will be creating.
    name = models.CharField(max_length=200, unique=True)
    #define a many to many field
    #adding a related_name for the reverser access to work
    #related name of this relation will be later refered in the serializer
    employees = models.ManyToManyField(Employee, related_name='projects')
    def __str__(self):
        return self.name