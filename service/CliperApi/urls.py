"""CliperApi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
# 使用 viewset 路由
from rest_framework.routers import DefaultRouter

from app import views
from app.views import UserViewset, RecordViewset, ShortUrlViewset

router = DefaultRouter()
# 注册user路由
router.register(r'user', UserViewset, basename='用户接口')
router.register(r'record', RecordViewset, basename='记录接口')
router.register(r'shorturl', ShortUrlViewset, basename='短网址接口')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)), # 使用Django REST framework路由系统
    re_path(r'^(?P<shortCode>[\w]+)/', views.ShortUrlViewset.as_view({'get': 'short2long'})),
]
