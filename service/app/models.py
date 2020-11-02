from django.db import models


# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='ID')
    key = models.CharField(max_length=1024, verbose_name='key', null=False)

    class Meta:
        db_table = 'm_user'
        verbose_name = '用户表'
        verbose_name_plural = verbose_name


class Record(models.Model):
    type_choices = (
        ('0', '文本'),
        ('1', '文件'),
    )
    is_delete_choices = (
        ('0', '生效中'),
        ('1', '已删除'),
    )
    id = models.AutoField(primary_key=True, verbose_name='ID')
    text_content = models.CharField(max_length=2048, verbose_name='文本内容', null=True)
    file_url = models.CharField(max_length=2048, verbose_name='文件地址', null=True)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间', null=True)
    type = models.CharField(choices=type_choices, default='0', max_length=255, verbose_name='类型')
    is_delete = models.CharField(choices=is_delete_choices, default='0', max_length=255, verbose_name='是否生效')
    user = models.ForeignKey('User', verbose_name='关联用户', related_name='userId', on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'm_record'
        verbose_name = '记录表'
        verbose_name_plural = verbose_name


class ShortUrl(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='ID')
    url = models.CharField(max_length=2048, verbose_name='原始url', null=True)
    short_code = models.CharField(max_length=15, verbose_name='缩短码', null=True)
    is_active = models.BooleanField(default=True, verbose_name='状态', null=True)
    is_delete = models.BooleanField(default=False, verbose_name='是否已删除', null=True)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间', null=True)
    user = models.ForeignKey('User', verbose_name='关联用户', related_name='shortUrl2UserId', on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'm_shorturl'
        verbose_name = '短链接表'
        verbose_name_plural = verbose_name
