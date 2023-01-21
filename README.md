# Storefront Backend

## Getting Started
1. Clone this repo and run `yarn` in your terminal at the project root.
2. Ensure you either have `docker` installed in your machine or a local instance of `postgres` installed in your machine.
3. For `DOCKER` there is a `docker-compose.yml` file at the root of the project. Navigate to the project's directory and run `docker compose up -d` to run your docker instance.
4. Use `docker compose ps` to check if the instance is running before connecting to it. You can proceed to login to it using `psql -U postgres`
5. For `postgres local instance`, first check if the service is running either from the services window [windows os] or `systemctl status postgresql` for linux system. Then login to the db using `psql -U postgres`
6. Rename the `.env.example` file to `.env` to use it as the configuration enviroment file.
7. To run migrations and create db. First run `yarn create-dev-db` to create the db and `yarn migrate-dev-db` to create migrations.
8. Change the `ENV` variable to `test` in the `.env` file and run `yarn test` to run tests.
9. Change the `ENV` variable to `dev` in the `.env` file and run `yarn start:dev` for development purposes and `yarn start:prod` for production.

## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- bcypt to hash password

## Storefront Endpoints

### Users 

| Method | Endpoint | Description | Response |
--- | --- | --- | --- | 
GET | /api/users | Retrieve list of users | 200 OK
POST | /api/users | Register a user | 201 OK
GET | /api/users/1 | Retrieve a single user | 200 OK
UPDATE | /api/users/1 | Update a user | 201 OK
DELETE | /api/users/1 | Delete a user | 200 OK
GET | /api/users/invalid | Validate invalid user | 400 BAD REQUEST
GET | /api/users/100 | Validate if user exists | 404 NOT FOUND

### Orders 

| Method | Endpoint | Description | Response |
--- | --- | --- | --- | 
GET | /api/orders | Retrieve list of orders | 200 OK
POST | /api/orders | Register an order | 201 OK
GET | /api/orders/1 | Retrieve a single order | 200 OK
UPDATE | /api/orders/1 | Update an order | 201 OK
DELETE | /api/orders/1 | Delete an order | 200 OK
GET | /api/orders/invalid | Validate invalid order id | 400 BAD REQUEST
GET | /api/orders/100 | Validate if order exists | 404 NOT FOUND


### Products 

| Method | Endpoint | Description | Response |
--- | --- | --- | --- | 
GET | /api/products | Retrieve list of products | 200 OK
POST | /api/products | Register a product | 201 OK
GET | /api/products/1 | Retrieve a single product | 200 OK
UPDATE | /api/products/1 | Update a product | 201 OK
DELETE | /api/products/1 | Delete a product | 200 OK
GET | /api/products/invalid | Validate invalid product id | 400 BAD REQUEST
GET | /api/products/100 | Validate if product exists | 404 NOT FOUND


### Dashboard 

| Method | Endpoint | Description | Response |
--- | --- | --- | --- | 
GET | /api/dashboard/user-order | Retrieve a user with specific order | 200 OK
GET | /api/dashboard/users-orders | Retrieve list of all orders placed | 200 OK
GET | /api/cart/1 | Retrieve a specific order in cart | 200 OK
UPDATE | /api/users/1/checkout/1 | Checkout an order | 201 OK


