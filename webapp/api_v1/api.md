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
      friendsSince: String
    },
    ...
  ]
}
```
- `friendsSince` is the time when the current user and the specified user became friends. If the two users are not friends, this field is the empty string `''`.

`GET /api/v1/users/<username>/`
- Returns the profile of a specific user.
- Data is returned in JSON format in the following format:
```
{
  username: String,
  image: String,
  about: String,
  friending: Boolean,
  friendingTime: String,
  friended: Boolean,
  friendedTime: String
}
```
- `friending` is `true` when either the current user and the searched user are friends, or the current user has sent a friend request to the searched user.
- `friended` is `true` when either the current user and the searched user are friends, or the searched user has sent a friend request to the current user.
- `friendingTime` and `friendedTime` are the timestamps when the friend requests were sent, or the time that the two users became friends.

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

`POST /api/v1/friends/`
- Add a new friend request or friend.
- Takes data in JSON format in the following format:
```
{
  username: String
}
```
- Returns `201 Created` on success.