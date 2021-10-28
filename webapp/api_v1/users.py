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
    logname = session['username']
    search = request.args.get('search')
    limit = request.args.get('limit')

    if limit is None:
        res = db.execute(
            'SELECT u.username, p.image, p.about '
            'FROM users AS u INNER JOIN profiles AS p ON u.username = p.username '
            'WHERE u.username LIKE ?',
            ('%' + search + '%',)
        ).fetchall()
        for r in res:
            are_friends = db.execute(
                'SELECT COUNT(*) AS count '
                'FROM friends '
                'WHERE (user1 = ? AND user2 = ?) '
                'OR (user1 = ? AND user2 = ?)',
                (logname, r['username'], r['username'], logname)
            ).fetchone()['count'] == 2
            if not are_friends:
                r['friendsSince'] = ''
            else:
                r['friendsSince'] = db.execute(
                    'SELECT created AS since '
                    'FROM friends '
                    'WHERE user1 = ? AND user2 = ?',
                    (logname, r['username'])
                ).fetchone()['since']
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
    logname = session['username']

    db = model.get_db()
    res = db.execute(
        'SELECT username, image, about '
        'FROM profiles '
        'WHERE username = ?',
        (username,)
    ).fetchone()

    friending_res = db.execute(
        'SELECT COUNT(*) AS count, created AS friending_time '
        'FROM friends '
        'WHERE user1 == ? AND user2 == ?',
        (logname, username)
    ).fetchone()
    friending = friending_res['count'] == 1

    friended_res = db.execute(
        'SELECT COUNT(*) AS count, created AS friended_time '
        'FROM friends '
        'WHERE user1 == ? AND user2 == ?',
        (username, logname)
    ).fetchone()
    friended = friended_res['count'] == 1

    res['friending'] = friending
    res['friendingTime'] = friending_res['friending_time']
    res['friended'] = friended
    res['friendedTime'] = friended_res['friended_time']

    return flask.jsonify(res)
