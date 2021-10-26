"""
Webapp API version 1

Provides the following functionality:

GET /api/v1/
- Returns a list of services available.

GET /api/v1/users/?search=<string>&limit=<int>
- Returns data about users whose usernames match the search query.
- Query parameters:
    - search: <string> a string representing the search query.
        search is a required parameter.
    - limit: <int> the number of results to return.
        If numResults is not specified, the API endpoint returns all results.
- Data is returned in JSON format in the following format:
{
    results: [
        {
            username: String,
            image: String,
            about: String,
        }
    ]
}

GET /api/v1/users/<username>/
- Returns the profile of a specific user.
- Data is returned in JSON format in the following format:
{
    username: String,
    image: String,
    about: String,
}

"""

from webapp.api_v1.users import webapp_api_search_users, webapp_api_user_profile
