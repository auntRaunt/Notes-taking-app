CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
)

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL
)