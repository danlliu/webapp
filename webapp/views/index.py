import flask
from flask import request, session

import webapp


@webapp.app.route('/')
def webapp_index():
    if 'username' in session:
        return flask.render_template('index.html', **{'logname': session['username']})
    return flask.render_template('index-nologin.html')


@webapp.app.route('/users/')
@webapp.app.route('/profile/')
def webapp_alt_index():
    if 'username' in session:
        return flask.render_template('index.html', **{'logname': session['username']})
    return flask.redirect(flask.url_for('webapp_index'))
