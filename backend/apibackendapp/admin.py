from django.contrib import admin
from .models import Department, Employee, UserDetails, Project


# Register your models here.
# register all the models that we want to manage using the
# django's default admin interface
admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(UserDetails)
admin.site.register(Project)