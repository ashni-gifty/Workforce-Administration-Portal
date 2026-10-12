#import DefaultRouter class to register routes (url path)
from rest_framework.routers import DefaultRouter
#import the entire view file
from . import views
from django.urls import path #import path function for custom url
from rest_framework_simplejwt.views import TokenRefreshView

#create a router instance
router = DefaultRouter()

#register each route end point url 
# and its corresponding views
router.register(r'employees', views.EmployeeViewSet)
router.register(r'departments', views.DepartmentViewSet)
#router.register(r'users', views.UserViewSet)
router.register(r'userdetails', views.UserDetailsViewSet)
router.register(r'projects', views.ProjectViewSet)

#our LoginAPIView and SignupAPIView s are APIViews not ViewSet
#so it should be custom added to the url patterns list using path() fn
#and then append it to the existing urlpattens list
urlpatterns = [
    path('signup/', views.SignupAPIView.as_view(), name="user-signup"),
    path('login/', views.LoginAPIView.as_view(), name="user-login"),
    path('token/refresh/',TokenRefreshView.as_view(),name="token_refresh"),
]

#convert the registered urls into url patterns list
urlpatterns = router.urls + urlpatterns
