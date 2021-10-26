"""API Route for Users Search"""

from difflib import SequenceMatcher

import flask
from flask import request, session

import webapp
from webapp import model


@webapp.app.route('/api/v1/users/')
def webapp_api_search_users():
    if 'username' not in session:
        return '', 403

    db = model.get_db()
    search = request.args.get('search')
    limit = request.args.get('limit')

    if limit is None:
        res = db.execute(
            'SELECT u.username, p.image, p.about '
            'FROM users AS u INNER JOIN profiles AS p ON u.username = p.username '
            'WHERE u.username LIKE ?',
            ('%' + search + '%',)
        ).fetchall()
        res.sort(key=lambda x: SequenceMatcher(None, x['username'], search).ratio(), reverse=True)
        return flask.jsonify(res)
    else:
        res = db.execute(
            'SELECT u.username, p.image, p.about '
            'FROM users AS u INNER JOIN profiles AS p ON u.username = p.username '
            'WHERE u.username LIKE ? LIMIT ?',
            ('%' + search + '%', limit)
        ).fetchall()
        res.sort(key=lambda x: SequenceMatcher(None, x['username'], search).ratio(), reverse=True)
        return flask.jsonify(res)


@webapp.app.route('/api/v1/users/<username>/')
def webapp_api_user_profile(username):
    if 'username' not in session:
        return '', 403

    db = model.get_db()
    res = db.execute(
        'SELECT image, about '
        'FROM profiles '
        'WHERE username = ?',
        (session['username'],)
    ).fetchone()

    res['username'] = session['username']
    return flask.jsonify(res)
