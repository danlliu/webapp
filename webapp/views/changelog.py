import flask

import webapp


@webapp.app.route('/changelog/')
def webapp_changelog():
    return flask.send_from_directory('static/html', 'changelog.html')
