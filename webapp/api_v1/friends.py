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

    incoming = db.execute(
        'SELECT user1 AS username, created AS time '
        'FROM friends '
        'WHERE user2 = ?',
        (username,)
    ).fetchall()

    friendUsernames = [r['username'] for r in requests if not r['pending']]
    incoming = [i for i in incoming if i['username'] not in friendUsernames]

    res = {
        'pending': [r for r in requests if r['pending']],
        'friends': [r for r in requests if not r['pending']],
        'incoming': incoming
    }

    return flask.jsonify(res)


@webapp.app.route('/api/v1/friends/', methods=['POST'])
def webapp_api_post_friend():
    if 'username' not in session:
        return '', 403
    logname = session['username']

    data = request.json
    if data is None:
        return '', 400

    username = data['username']
    db = webapp.model.get_db()

    exists = db.execute(
        'SELECT COUNT(*) AS count FROM friends '
        'WHERE user1 = ? AND user2 = ?',
        (logname, username)
    ).fetchone()['count'] == 1

    if exists:
        return '', 409

    reverse = db.execute(
        'SELECT COUNT(*) AS count FROM friends '
        'WHERE user1 = ? and user2 = ?',
        (username, logname)
    ).fetchone()['count'] == 1

    db.execute(
        'INSERT INTO friends (user1, user2) '
        'VALUES (?, ?)',
        (logname, username)
    )

    if reverse:
        # new friend!
        friend_time = db.execute(
            'SELECT created FROM friends '
            'WHERE user1 = ? AND user2 = ?',
            (logname, username)
        ).fetchone()['created']

        db.execute(
            'UPDATE friends SET created = ? '
            'WHERE user1 = ? AND user2 = ?',
            (friend_time, username, logname)
        )

    return '', 201
