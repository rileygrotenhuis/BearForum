# Bear Forum

Bear Forum is a CRUD forum web application built using the Node and Express Javascript frameworks. Users can create an account and login to view posts from other users as well as create, update, and delete any of their own posts. There is also an admin portal for this forum which allows an admin to update or delete any post or user that they want.

## Requirements

---

You will need the latest versions of [Node](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/get-npm) to run Bear Forum correctly. To check whether you have the correct version, run the following commands:

```bash
node -v
```

```bash
npm -v
```

You will also need the latest version of PostgreSQL to run the database that is needed for this application. You can download the most recent version of PostgreSQL using this [link](https://www.postgresql.org/download/)

## Setup

---

You can utilize this repository by one of the two ways:

1. Downloading the source code directly from this [link](https://github.com/rileygrotenhuis/BearForum/archive/refs/heads/master.zip)

2. Cloning the repository using your preferred Command Line Interface and running the following command:

    ```bash
    git clone https://github.com/rileygrotenhuis/BearForum.git
    ```

> Note: Whether you chose to download, or clone, this repository, it is preferred that you do so inside of your `documents/` directory.

> Note: If you download the source code directly from GitHub into a `.zip` file, you will need to rename the folder from `BearForum-master` to just `BearForum`.

3. You will now need to setup the database for this project, for there is no public database:

    1. Open PostgreSQL in your Command Line Interface under the `Postgres` user

        ```bash
        psql -U postgres
        ```

    2. Then you will need to create a new database called `bearforum` and connect to that database

        ```sql
        CREATE DATABASE bearforum
        ```

        ```bash
        \c bearforum
        ```

    3. Then you will need to create the tables necessary for the `bearforum` database

        ```sql
        CREATE TABLE admins (
          username varchar(25) PRIMARY KEY,
          admin_password varchar(25)
        );

        CREATE TABLE users (
          username varchar(25) PRIMARY KEY,
          user_password varchar(25),
          first_name varchar(25),
          last_name varchar(25),
          user_email varchar(50),
          location_city varchar(25),
          location_state varchar(25),
          biography varchar(255)
        );

        CREATE TABLE posts (
          post_id varchar(100) PRIMARY KEY,
          title varchar(25),
          topic varchar(25),
          author varchar(25),
          date_posted varchar(100),
          content varchar(255),
          FOREIGN KEY (author) REFERENCES users
        );
        ```

    4. _OPTIONAL_: If you wish to seed the database with some test data, you may do so by running the following SQL commands:

        ```sql
          INSERT INTO admins VALUES (
              'admin',
              'Aeiy=mpcdbvb1'
          );

          INSERT INTO admins VALUES (
              'system_admin',
              'Riley100500'
          );

          INSERT INTO users VALUES (
              'rg1050',
              'Aeiy=mpcdbvb1',
              'Riley',
              'Grotenhuis',
              'rileygrotenhuis@gmail.com',
              'Springfield',
              'Missouri',
              'My name is Riley Grotenhuis and this is my bio!'
          );

          INSERT INTO users VALUES (
              'mc123',
              '123',
              'Maddie',
              'Carter',
              'maddiecarter@gmail.com',
              'Columbia',
              'Missouri',
              'My name is Maddie Carter and this is my bio!'
          );

          INSERT INTO posts VALUES (
              '1',
              'Post 1',
              'MISC',
              'rg1050',
              '22/02/2021',
              'This is the first post from Riley'
          );

          INSERT INTO posts VALUES (
              '2',
              'Post 2',
              'MISC',
              'mc123',
              '15/02/2021',
              'This is the first post from Maddie'
          );
        ```

## Usage

---

1. Open your preferred Command Line Interface (Terminal, Command Prompt, iTask2, PowerShell, etc.) and change your directory until you are in the project folder

    ```bash
    cd documents
    cd BearForum
    ```

2. Once you are in the project's folder, you will need to create a `.env` in the root directory and include the following environment variable inside of that file:

    ```env
    SESSION_SECRET=[ENTER YOUR SECRET CODE HERE]
    ```

3. At this point, you can now run the following command in your Command Line Interface to run the Bear Forum web application:

    ```bash
    npm install
    node server.js
    ```

> Note: Once you run this application, you can access it at http://localhost:3000/

## Files & Directories

---

-   _config/_
    -   `db.config.js`
    -   `db.seed.config.sql`
    -   `db.tables.config.sql`
    -   `passport.config.js`
-   _docs/_
    -   `routes.txt`
-   _routes/_
    -   `create.routes.js`
    -   `login.routes.js`
    -   `post.routes.js`
    -   `register.routes.js`
    -   `user.routes.js`
-   _util/_
    -   `checkAuthenticated.js`
    -   `checkNotAuthenticated.js`
-   _views/_
    -   _partials/_
        -   `footer.ejs`
        -   `header.ejs`
        -   `navbar.ejs`
        -   `post-feed.ejs`
    -   _post/_
        -   `index.ejs`
        -   `update.ejs`
    -   _user/_
        -   `index.ejs`
        -   `update.ejs`
    -   `create.ejs`
    -   `index.ejs`
    -   `login.ejs`
    -   `register.ejs`
-   `server.js`

## Notes

---

This project currently does not have a list site to where you can test it. I am hoping to change this in the future as I am hoping to include a testing site for all of my personal projects that will be connected to my [Personal Portfolio Website](http://rileygrotenhuis.com/), but as of now you must run this project locally.

## Contributors

---

-   ### Riley Grotenhuis (rg1050@live.missouristate.edu)
