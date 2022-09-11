-- \c messagely_test
-- \c messagely

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);


INSERT INTO users (username, password, first_name, last_name, phone, join_at)
    VALUES('kgag', 'password', 'Kris', 'Gagne', '555-867-5309', CURRENT_TIMESTAMP),
        ('agag', 'pword', 'Alexis', 'Gagne', '555-444-3333', CURRENT_TIMESTAMP);

INSERT INTO messages (from_username, to_username, body, sent_at)
    VALUES('kgag', 'agag', 'Hello!!!', CURRENT_TIMESTAMP),
    ('agag', 'kgag', 'What is up???', CURRENT_TIMESTAMP);