from rest_framework import serializers

from . import constant
from .models import User, Record, ShortUrl


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' # 序列化全部字段，实际中不建议使用，因为像password等字段是不应该返回给前端的
        # fields = ('id','username','phone','email')

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__' # 序列化全部字段，实际中不建议使用，因为像password等字段是不应该返回给前端的
        # fields = ('id','username','phone','email')

class ShortUrlSerializer(serializers.ModelSerializer):
    short_url = serializers.SerializerMethodField()
    class Meta:
        model = ShortUrl
        fields = ('id', 'url', 'short_code','is_active','short_url','created_time','user',) # 序列化全部字段，实际中不建议使用，因为像password等字段是不应该返回给前端的


    def get_short_url(self,obj):
        return constant.shorturl_prefix+obj.short_code
        # fields = ('id','username','phone','email')
