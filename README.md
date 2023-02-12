# Storefront Backend Project
Udacity Nanodegree
Project 2
(February 2023)

# Author
Lubna Helaly

## Endpoints
refer to REQUIREMENTS.md for further details

## Install project
> yarn

## Database setup
Terminal
> psql postgres

> CREATE USER admin_user WITH PASSWORD 'password123';

> CREATE DATABASE shop;

> CREATE DATABASE shop_test;

> GRANT ALL PRIVILEGES ON DATABASE shop to admin_user;

> GRANT ALL PRIVILES ON DATABASE shop_test to admin_user;

If the docker is run as mentioned below it shall do all of the above commands except 
CREATE DATABASE shop_test;
GRANT ALL PRIVILES ON DATABASE shop_test to admin_user;

## .ENV
Create .env file with the below
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shop
POSTGRES_TEST_DB=shop_test
POSTGRES_USER=admin_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=secret
SALT_ROUNDS=5
TOKEN_SECRET=store
TOKEN_TEST=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzYwODU3ODR9.KIquAlpfu5ePmbS0v4a5ucy24wRXRKeyglB5fxVVRvU
ENV=dev

## Ports
Database run on port 5432
Application run on port 3000

## IP
Application run on IP 127.0.0.1

## Running
Terminal 1
> docker-compose up

Terminal 2
> db-migrate up
> yarn watch

Postman Desktop
/storefront-API.postman_collection.json
This can be imported to Postman Desktop to have all the API calls ready to be used

## Unit Tests
Database shop_test must exist

change in .env file
ENV=test

Terminal
> yarn test