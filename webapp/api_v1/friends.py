import flask
from flask import request, session

import webapp


@webapp.app.route('/api/v1/friends/')
def webapp_api_get_friends():
    if 'username' not in session:
        return '', 403

    db = webapp.model.get_db()
    username = session['username']

    requests = db.execute(
        'SELECT user2 AS username, created AS time '
        'FROM friends '
        'WHERE user1 = ?',
        (username,)
    ).fetchall()

    for req in requests:
        count = db.execute(
            'SELECT COUNT(*) AS re '
            'FROM friends '
            'WHERE user1 = ? AND user2 = ?',
            (req['username'], username)
        ).fetchone()['re']

        req['pending'] = count == 0

    res = {
        'pending': [r for r in requests if r['pending']],
        'friends': [r for r in requests if not r['pending']]
    }

    return flask.jsonify(res)
