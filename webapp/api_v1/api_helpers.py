import flask
from flask import request, session

import webapp


@webapp.app.route('/api/v1/utils/logname/')
def webapp_api_utils_logname():
    if 'username' not in session:
        return '', 403
    return flask.jsonify({'logname': session['username']})
