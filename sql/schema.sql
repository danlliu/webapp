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
)