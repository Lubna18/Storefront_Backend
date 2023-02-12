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

## Unit Tests
use psql to add a new database called shop_test

Terminal
> yarn test

## Running
Terminal 1
> docker-compose up

Terminal 2
> db-migrate up
> yarn watch

Postman Desktop
/storefront-API.postman_collection.json
This can be imported to Postman Desktop to have all the API calls ready to be used

## NOTES
- I left .env for the sake of making the project runnable but i know that it should not be pushed to the Git
- i made one migration file because the creation of the tables order is not identical to the order of deletion due to the relations between the tables. Having one file helped me control the order of creation / deletion.