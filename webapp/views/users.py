import arrow

import flask
from flask import request, session

import webapp


@webapp.app.route('/users/<username>/')
def webapp_users(username):
    if 'username' not in session:
        return flask.redirect(flask.url_for('webapp_index'))

    db = webapp.model.get_db()
    logname = session['username']

    res = db.execute(
        'SELECT image, about '
        'FROM profiles '
        'WHERE username == ?',
        (username,)
    ).fetchone()

    if res is None:
        return flask.abort(404)

    return flask.render_template('user.html', **{
        'username': username,
        'image': res['image'],
        'about': res['about'],
        'logname': logname
    })

