import pathlib
import uuid

import flask
from flask import session

import webapp


@webapp.app.route('/uploads/<path:path>')
def webapp_uploads(path):
    if 'username' not in session:
        flask.abort(403)
    return flask.send_from_directory(webapp.app.config['UPLOAD_FOLDER'], path)


def upload_file(file):
    """
    Upload a file to the server.
    :param file: a file object from request.files.
    :return: the new filename on the server.
    """
    uuid_basename = f'{uuid.uuid4().hex}{pathlib.Path(file.filename).suffix}'
    path = webapp.app.config['UPLOAD_FOLDER'] / uuid_basename
    file.save(path)
    return uuid_basename
