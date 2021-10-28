import flask
from flask import request, session

import webapp


@webapp.app.route('/')
def webapp_index():
    if 'username' in session:
        return flask.render_template('index.html', **{'logname': session['username']})
    return flask.render_template('index-nologin.html')


@webapp.app.route('/users/')
@webapp.app.route('/users/<username>/')
@webapp.app.route('/profile/')
@webapp.app.route('/friends/')
def webapp_alt_index(username=None):
    if 'username' in session:
        return flask.render_template('index.html', **{'logname': session['username']})
    return flask.redirect(flask.url_for('webapp_index'))
