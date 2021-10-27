"""Views, one for each page."""

from webapp.views.uploads import webapp_uploads

from webapp.views.index import webapp_index, webapp_alt_index
from webapp.views.accounts import webapp_accounts_login, webapp_accounts_signup
from webapp.views.users import webapp_users
