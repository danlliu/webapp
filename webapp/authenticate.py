import flask
from flask import Flask
from passlib.hash import argon2


def hash_password(password):
    return argon2.hash(password)


def check_password(password, hashed):
    return argon2.verify(password, hashed)


def authenticate_user(username, password, db):
    hashed_password = db.execute(
        'SELECT password FROM users WHERE username = ?', (username,)
    ).fetchone()
    if hashed_password is None:
        return False
    hashed_password = hashed_password['password']
    return check_password(password, hashed_password)
