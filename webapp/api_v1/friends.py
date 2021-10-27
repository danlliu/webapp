import flask
from flask import request, session

import webapp


@webapp.app.route('/api/v1/friends/')
def webapp_api_get_friends():
