from django.test import TestCase

def func1(*args):
    print(args)
def func2(**kwargs):
    print(kwargs)

if __name__ == '__main__':
    func1(1,2,3)
    func2(user=1,pwd=2)
