from flask import request, session

import webapp
from webapp.views.uploads import upload_file


@webapp.app.route('/api/v1/profile', methods=['PUT'])
def webapp_api_update_profile():
    if 'username' not in session:
        return '', 403

    db = webapp.model.get_db()
    username = session['username']
    new_about = request.form['about']
    new_file = request.files.get('profile')

    if new_file is not None:
        new_filename = upload_file(new_file)
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
