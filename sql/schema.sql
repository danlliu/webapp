PRAGMA foreign_keys = ON;

CREATE TABLE users(
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(username)
);

CREATE TABLE profiles(
    username VARCHAR(255) NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    about VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

-- user1 friends user2
-- if user2 friends user1 as well: user1 and user2 are friends
-- if user2 doesn't friend user1: user1 has a pending friend request to user2
CREATE TABLE friends(
    user1 VARCHAR(255) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    user2 VARCHAR(255) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user1, user2)
);
