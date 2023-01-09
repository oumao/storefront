CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(155) NOT NULL,
    lastName VARCHAR(155) NOT NULL,
    password_digest CHAR(60)
);