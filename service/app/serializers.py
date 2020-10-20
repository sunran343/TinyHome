from rest_framework import serializers
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
    class Meta:
        model = ShortUrl
        fields = '__all__' # 序列化全部字段，实际中不建议使用，因为像password等字段是不应该返回给前端的
        # fields = ('id','username','phone','email')
