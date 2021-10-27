# webapp API v1.0
- Routes that are not marked as `PUBLIC` will return `403 Unauthorized` if no valid session cookie is provided.
- Query parameters, form parameters, and files are required unless specified as `OPTIONAL`.

## Utilities:

`GET /api/v1/`
- Returns a list of services available.
- This route is a `PUBLIC` route.

`GET /api/v1/utils/logname/`
- Returns the current user's username.
- Data is returned in JSON format in the following format:
```
{
  username: String,
}
```

## User Data:

`GET /api/v1/users/?search=<string>&limit=<int>`
- Returns data about users whose usernames match the search query.
- Query parameters:
    - `search`: a string representing the search query.
      search is a required parameter.
    - `limit` (`OPTIONAL`): the number of results to return.
      If numResults is not specified, the API endpoint returns all results.
- Data is returned in JSON format in the following format:
```
{
  results: [
    {
      username: String,
      image: String,
      about: String,
    },
    ...
  ]
}
```

`GET /api/v1/users/<username>/`
- Returns the profile of a specific user.
- Data is returned in JSON format in the following format:
```
{
  username: String,
  image: String,
  about: String,
}
```

`GET /api/v1/users/profile/`
- Get the profile of the currently logged in user.
- Data is returned in JSON format in the following format:
```
{
  username: String,
  image: String,
  about: String,
}
```

`PUT /api/v1/users/profile/`
- Updates a user's profile with the specified about me, and optionally a new profile picture.
- Form parameters:
    - `about`: new about me text.
- Files:
    - `profile` (`OPTIONAL`): new profile picture.
- Returns `204 No Content` on success.

## Friends

`GET /api/v1/friends/`
- Get all friends of the current user, as well as pending friend requests initiated by the current user.
- Data is returned in JSON format in the following format:
```
{
  pending: [
    {
      username: String,
      time: DateTime,
      pending: Boolean
    }
  ],
  friends: [
    {
      username: String,
      time: DateTime,
      pending: Boolean
    }
  ]
}
```
