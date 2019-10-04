--users table
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

--insert one record into users table
INSERT INTO users (first, last, email, phone, location, hobby, added)
VALUES('test', 'user', 'test@user.com', '1234567890', 'Liechtenstein', 'Traveling', CURRENT_DATE)

--groups table
CREATE TABLE groups (
 id serial PRIMARY KEY,
 name VARCHAR(100),
 added TIMESTAMP NOT NULL
);

--insert one record into groups table
INSERT INTO groups (name, added)
VALUES('group1', CURRENT_DATE)

--users_groups
CREATE TABLE users_groups (
 id serial PRIMARY KEY,
 userid serial,
 groupid serial,
 added TIMESTAMP NOT NULL
);

--insert one record into users_groups table
INSERT INTO users_groups (userid, groupid, added) VALUES (1,1, CURRENT_DATE)
