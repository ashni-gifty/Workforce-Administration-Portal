from rest_framework.test import APITestCase, APIClient
from .models import Employee,Department,Project
from datetime import date
from django.urls import reverse
from .serializers import EmployeeSerializer
from rest_framework import status

# Create your tests here.

#create the class for testing the EmployeeViewSet CRUD operations
# using the setUp() fn define the dummy data for testing
class EmployeeViewSetTest(APITestCase):
    #define the setup function to setup the data for testing
    def setUp(self):
        #create a sample dept object
        self.department = Department.objects.create(DepartmentName="HR")
        # create some sample projects
        self.project1 = Project.objects.create(name="CMS")
        self.project2 = Project.objects.create(name="E-Commerce")
        # create a sample employee object with the details
        self.employee = Employee.objects.create(
            EmployeeName = "Jackie Chan",
            Designation = "Karate Master",
            DateOfJoining = date(2026,7,16),
            DepartmentId = self.department,
            Contact = "123456",
            IsActive = True
        )
        #assign projects to employee
        self.employee.projects.set([self.project1,self.project2])
        #assign the client property to APIClient class object
        self.client = APIClient()

    #TEST CASE 1 : Testing the list of all employees
    #acutal endpoint url was api/employees, but django test will not using it
    #django test framework will automatically create its own endpoint urls for testing
    #eg: employee-list to list all employees, employee-detail for details
    def test_employee_list(self):
        #step1: define the url and get the actual response
        url = reverse('employee-list') #reverse map the url for emp listing
        response = self.client.get(url)

        #step2: create objects for Employee Model and Employee serializer
        #this will contain the dummy data that we created
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)

        #step3: check for the status and the data
        #compare the response from step1 with step2
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
    
    #TEST CASE 2 : Testing the employee details
    def test_employee_details(self):
        #step1
        url = reverse('employee-detail', args=[self.employee.EmployeeId])
        response = self.client.get(url)
        #step2
        serializer = EmployeeSerializer(self.employee)
        #compare step1, step2
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
    
    #TEST CASE 3 : Testing the employee deletion
    def test_employee_delete(self):
        #step1
        url = reverse('employee-detail', args=[self.employee.EmployeeId])
        response = self.client.delete(url) #sending delete request
        #compare step1, step2
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Employee.objects.count(),0)

    #TEST CASE 4 : Testing the employee creation
    def test_employee_create(self):
        #step1
        url = reverse('employee-list')
        data = {
            "EmployeeName":"Bruce Lee",
            "Designation":"Kungfu Master",
            "DateOfJoining":"2026-07-16",
            "DepartmentId":self.department.DepartmentId,
            "Contact":"123456",
            "IsActive":True
        }
        response = self.client.post(url, data, format='json') #sending post request
        #compare step1, step2
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(),2)    

