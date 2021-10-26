import smtplib
from email.message import EmailMessage

import flask
from flask import session

import webapp
from webapp.authenticate import hash_password, authenticate_user


@webapp.app.route('/accounts/login/')
def webapp_accounts_login():
    return flask.render_template('login.html', **{'username': '', 'failed_login': False})


@webapp.app.route('/accounts/login/', methods=['POST'])
def webapp_login_user():
    db = webapp.model.get_db()
    username = flask.request.form['username']
    password = flask.request.form['password']
    if authenticate_user(username, password, db):
        session['username'] = username
        return flask.redirect(flask.url_for('webapp_index'))
    else:
        print('failed login')
        return flask.render_template('login.html', **{'username': username, 'failed_login': True})


@webapp.app.route('/accounts/signup/')
def webapp_accounts_signup():

    return flask.render_template('signup.html', **{'bad_username': False})

@webapp.app.route('/accounts/signup/', methods=['POST'])
def webapp_create_account():
    db = webapp.model.get_db()
    username = flask.request.form['username']
    email = flask.request.form['email']
    password = flask.request.form['password']

    if db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone() is not None:
        return flask.render_template('signup.html', **{'bad_username': True})

    db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        (username, email, hash_password(password))
    )
    db.execute(
        'INSERT INTO profiles (username) VALUES (?)',
        (username,)
    )
    session['username'] = username

    return flask.redirect(flask.url_for('webapp_index'))
