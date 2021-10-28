import flask
from flask import request, session

import webapp
from webapp.views.uploads import upload_file
from webapp.api_v1.users import webapp_api_user_profile


@webapp.app.route('/api/v1/users/profile/')
def webapp_api_get_profile():
    if 'username' not in session:
        return '', 403
    username = session['username']

    db = webapp.model.get_db()
    res = db.execute(
        'SELECT username, image, about '
        'FROM profiles '
        'WHERE username = ?',
        (username,)
    ).fetchone()

    return flask.jsonify(res)


@webapp.app.route('/api/v1/users/profile/', methods=['PUT'])
def webapp_api_update_profile():
    if 'username' not in session:
        return '', 403

    db = webapp.model.get_db()
    username = session['username']
    new_about = request.form['about']
    new_file = request.files.get('profile')

    print(new_file)

    if new_file is not None:
        new_filename = upload_file(new_file)
        print(new_filename)
        db.execute(
            'UPDATE profiles '
            'SET about = ?, '
            'image = ? '
            'WHERE username = ?',
            (new_about, new_filename, username)
        )
    else:
        db.execute(
            'UPDATE profiles '
            'SET about = ? '
            'WHERE username = ?',
            (new_about, username)
        )

    return '', 204
