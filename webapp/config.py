"""Development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

TEMPLATES_AUTO_RELOAD = True

# Secret key for encrypting cookies
SECRET_KEY = \
    b'\xd9\x90\xb5\xe4#\xa2\xb0Q?\xf6F\xdfsI\\\xc3\xdf\xcb\xab9\x93\x00\xc1\x18'
SESSION_COOKIE_NAME = 'login'

# File upload to var/uploads/
WEBAPP_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = WEBAPP_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

DATABASE_FILENAME = WEBAPP_ROOT/'var'/'webapp.sqlite3'
