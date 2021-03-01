# About The Project

### Overview
Bear Forum is a CRUD forum web application built using the Node and Express JavaScript frameworks. Users can create an account and login to view posts from other users as well as create, update and delete any of their own posts. There is also an admin portal for this forum which allows an admin to update or delete any post or user that they want.

### Here's Why
I built this CRUD forum web application to demonstrate my skills in creating, reading, updating, and deleting data from a database and representing that onto a web page using EJS templates. I also wanted to demonstrate that I could create a web application with proper authentication, and I completed this by using the Passport.js Node Package.

### Technologies Used
- PostgreSQL
- Node.js
- Express.js
- EJS Templates
- Passport.js
- Express-Sessions

# Getting Started

### Prerequisites

You will need the latest versions of Node and NPM to run Bear Forum.

``` bash
  node -v
```

``` bash
  npm -v
```

### Database Setup

You will need to install PostgreSQL onto your computer to run Bear Forum locally on your machine [PostgreSQL Download](https://www.postgresql.org/). <br>
Once you have installed PostgreSQL onto your computer, you will need to open your terminal/command prompt and follow these instructions:

1. Open PostgreSQL under the ***Postgres*** user
  ``` bash
    psql -U postgres
  ```

2. Create a new database called in PostgreSQL called `bearforum` and connect to that database
  ``` SQL
    CREATE DATABASE bearforum;
  ```
  ``` bash
    \c bearforum
  ```

3. Create the tables in the `bearforum` database that are needed to run BearForum
  ``` SQL
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

4. *OPTIONAL*: If you wish to seed the database with some test data, you may do so by running the following SQL commands:
``` SQL
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

These SQL commands create two different Users and two different posts (one for each user). 

### Installation

1. Clone this GitHub Repo
  ``` bash
    git clone https://github.com/rileygrotenhuis/BearForum.git
  ```

2. Install the NPM packages
  ``` bash
    npm install
  ```

3. Create a .env file and create a `SESSION_SECRET` variable
  ``` bash
    touch .env
  ```
  ``` .env
    SESSION_SECRET=[YOUR_SECRET_CODE]
  ```

# Usage

To run the project, just run the following Node command:

``` bash
  npm run dev
```

After you run this Node command, Bear Forum will then run on your [Local Host](http://localhost:3000) on Port 3000.

# Contribution

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m "Commit Message"`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

# Contact

Riley Grotenhuis - rg1050@live.missouristate.edu
Project Link - https://github.com/rileygrotenhuis/BearForum