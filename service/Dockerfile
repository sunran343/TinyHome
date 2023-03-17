FROM python:3.8
WORKDIR /cliper
COPY . .
RUN pip config set global.index-url http://mirrors.aliyun.com/pypi/simple
RUN pip config set install.trusted-host mirrors.aliyun.com
RUN pip install -r requirements.txt

CMD ["python3", "manage.py","runserver" ,"[::]:8000"]
EXPOSE 8000

