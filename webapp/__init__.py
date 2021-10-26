from flask import Flask


app = Flask(__name__)
app.config.from_object('webapp.config')

import webapp.api_v1
import webapp.views
import webapp.model
