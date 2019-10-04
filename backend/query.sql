CREATE TABLE users (
 id serial PRIMARY KEY,
 first VARCHAR(100),
 last VARCHAR(100),
 email text UNIQUE NOT NULL,
 phone VARCHAR(100),
 location VARCHAR(100),
 hobby VARCHAR(100),
 added TIMESTAMP NOT NULL
);

INSERT INTO users (first, last, email, phone, location, hobby, added)
VALUES('test', 'user', 'test@user.com', '1234567890', 'Liechtenstein', 'Traveling', CURRENT_DATE)

CREATE TABLE groups (
 id serial PRIMARY KEY,
 name VARCHAR(100),
 added TIMESTAMP NOT NULL
);

INSERT INTO groups (name, added)
VALUES('group1', CURRENT_DATE)

CREATE TABLE users_groups (
 id serial PRIMARY KEY,
 userid serial,
 groupid serial,
 added TIMESTAMP NOT NULL
);

INSERT INTO users_groups (userid, groupid, added) VALUES (1,1, CURRENT_DATE)