import json

from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet

from app import utils, mhttp
from app.models import User, Record, ShortUrl
from app.serializers import UserSerializer, RecordSerializer, ShortUrlSerializer


# 用户view
class UserViewset(ModelViewSet):
    '''
    修改局部数据
    create:  创建用户
    retrieve:  检索某个用户
    update:  更新用户
    destroy:  删除用户
    list:  获取用户列表
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # drf 过滤&搜索&排序
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter,)
    # 搜索
    # search_fields = ('key',)
    # 过滤
    filter_fields = ('key',)
    # 排序
    # ordering_fields = ('created_time',)


# 记录view
class RecordViewset(ModelViewSet):
    queryset = Record.objects.all().order_by('-created_time')
    serializer_class = RecordSerializer
    # drf 过滤&搜索&排序
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter,)
    # 搜索
    # search_fields = ('username', 'phone', 'email',)
    # 过滤
    filter_fields = ('user', 'type', 'is_delete')
    # 排序
    ordering_fields = ('created_time',)

    @action(methods=['get'], detail=False, )
    def deleteByUserId(self, request):
        if request.method == 'GET':
            res = -1
            userId = request.GET.get('userId')
            if userId:
                res = Record.objects.all().filter(user=userId, is_delete='0').update(is_delete='1')
            return HttpResponse(res)


# 短码view
class ShortUrlViewset(ModelViewSet):
    queryset = ShortUrl.objects.all().order_by('-created_time')
    serializer_class = ShortUrlSerializer
    # drf 过滤&搜索&排序
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter,)
    # 搜索
    # search_fields = ('username', 'phone', 'email',)
    # 过滤
    filter_fields = ('user', 'short_code', 'is_active')
    # 排序
    ordering_fields = ('created_time',)

    def short2long(self, request, shortCode=None):
        objs = ShortUrl.objects.all().filter(short_code=shortCode, is_active=True)
        if len(objs) == 0:
            raise Http404
        return HttpResponseRedirect(objs[0].url)

    @action(methods=['post'], detail=False, )
    def long2short(self, request):
        if request.method == 'POST':
            url = request.POST.get('url')
            user_id = request.POST.get('userId')
            is_good = utils.is_good_url(url)
            # 检查url
            if not is_good:
                return mhttp.params_error(message='URL不合法')
            # 检查url是否已经生成过
            objs = ShortUrl.objects.all().filter(url=url, is_active=True)
            if len(objs) > 0:
                return mhttp.result(data={'url': 'xxx' + objs[0].short_code})
            # 生成短码
            while True:
                short_code = utils.random_str(size=4)
                objs = ShortUrl.objects.all().filter(short_code=short_code, is_active=True)
                if len(objs) == 0:
                    break
            # 存储
            shortUrl = ShortUrl()
            shortUrl.url = url
            shortUrl.short_code = short_code
            shortUrl.user = user_id
            shortUrl.save()
            return mhttp.result(data={'url': 'xxx' + short_code})
