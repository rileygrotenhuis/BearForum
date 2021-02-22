/* admins Table Test Data */
INSERT INTO admins VALUES (
    'admin',
    'Aeiy=mpcdbvb1'
);

INSERT INTO admins VALUES (
    'system_admin',
    'Riley100500'
);

/* users Table Test Data */
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

/* posts Table Test Data */
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