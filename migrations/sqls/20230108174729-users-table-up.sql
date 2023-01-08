CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    firstName VARCHAR(155) NOT NULL,
    lastName VARCHAR(155) NOT NULL,
    password CHAR(60)
);