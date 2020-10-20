import random
import re
import string


def random_str(size=6,chars=string.ascii_lowercase+string.digits):
    code = ''
    for _ in range(size):
        code+=random.choice(chars)
    return code


def is_good_url(url):
    if re.match(r'^https?:/{2}\w.+$', url):
        return True
    else:
        return False




if __name__ == '__main__':
    code = is_good_url("http://b399bdf4.nat3.nsloop.com/weixin/accept/")
    print(code)

