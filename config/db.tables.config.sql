/* Create admins Table */
CREATE TABLE admins (
    username varchar(25) PRIMARY KEY,
    admin_password varchar(25)
);

/* Create users Table */
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

/* Create posts Table */
CREATE TABLE posts (
    post_id varchar(100) PRIMARY KEY,
    title varchar(25),
    topic varchar(25),
    author varchar(25),
    date_posted varchar(100),
    content varchar(255),
    FOREIGN KEY (author) REFERENCES users
);