# UserManagementSystem Backend API (Run Back end first in http://localhost:3000)

Start a UserManagementSystem API quickly using Node, Express & Postgres.

Serves four requests (get, post, put, delete) from one page with a separate function for each.

All code can be edited and replaced to fit the needs of the project being built.

**Dependencies**

We use **express** to serve the API, **body-parser** to parse responses, **postgres** for the database, **knex** as the query engine, **dotenv** to protect environment variables, **helmut** to add proper headers, **cors** to prevent/allow XSS, **morgan** as our logger, and **nodemon** as a dev dependency to watch for changes.

All dependencies are included in the cloned project.

## Instructions

**1. Clone the repo**

```
git clone https://github.com/vjustinjohn/UserManagementSystem.git
```

**2. CD into the project**

```
cd backend
```

**3. Install dependencies**

```
npm install
```

**4. Start Postgres**

```
services start postgresql
```

**Note:** You can use Postgres for database

**5. Create a database**

Change the database name to whatever you would like to name the database. Be sure to also change the database name in server.js to whatever you name the database.

```
createdb ums
```

**6. Create a database table**

Open pgAdmin (Download and install Postgres SQL from https://www.postgresql.org/download/) and run the following query.
Update database configurations in server.js

```
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
```

## UserManagementSystem Frontend
View the [repository for the frontend](https://github.com/vjustinjohn/UserManagementSystem/frontend) that goes along with this API. It uses React and Bootstrap to display a responsive data table.

## Further Information

Run Backend first in http://localhost:3000 using npm start and then start frontend