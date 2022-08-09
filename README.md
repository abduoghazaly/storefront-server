# Storefront Backend Project
###### Fwd Advanced Full-Stack Web

this project build server side API to manage a store products and orders,
with Express and Postgres.

## usage 

- install postgres.
    - via [postgres](https://www.postgresql.org/download/)
    - postgras will run at: 'localhost' with port '5432'
- create database user. (psql terminal)
    - CREATE USER postgres WITH PASSWORD '2323';
- create database in postgres. (psql terminal)
    - CREATE DATABASE  storefront;
- change .env file with your custome configration. (OPTIONAL)
- run `npm install` to install and update all package.
- to start server run: `npm run watch`.
- by defult server will run at : `localhost:3000`.
- use [API](#api).

## API

user API:
- get /user             (TOKEN REQUIRED)
- get /user/:id         (TOKEN REQUIRED)
- post /user
    {
      name,
      email,
      password
    }
- put /user/:id         (TOKEN REQUIRED)
    {
      name,
      email,
      password
    }
- delete /user/:id      (TOKEN REQUIRED)
- post /signin`
     {
      email,
      password
    }

category API:
-  get /category        (TOKEN REQUIRED)
-  get /category/:id    (TOKEN REQUIRED)
-  post /category       (TOKEN REQUIRED)
    {
      name,
      description
    }
-  put /category/:id    (TOKEN REQUIRED)
    {
      name,
      description
    }
-  delete /category/:id (TOKEN REQUIRED)

product API:
-  get /product         (TOKEN REQUIRED)
-  get /product/:id     (TOKEN REQUIRED)
-  post /product        (TOKEN REQUIRED)
    {
        name,
        description,
        price,
        category_id
    }
-  put /product/:id     (TOKEN REQUIRED)
    {
        name,
        description,
        price,
        category_id
    }
-  delete /product/:id  (TOKEN REQUIRED)

order API:
-   get /order          (TOKEN REQUIRED)
-   get /order/:id      (TOKEN REQUIRED)
-   get /orderByUser/:id      (TOKEN REQUIRED)
-   get /complatedOrdersByUser/:id   (TOKEN REQUIRED)
-   post /order         (TOKEN REQUIRED)
    {
        user_id,
        status,
        orderProduct:[
            {   
                 order_id,
                product_id,
                quantity,
                price
            }
        ]
    }   
- put /order/:id        (TOKEN REQUIRED)
- delete /order/:id     (TOKEN REQUIRED)

ordersProducts API:
- get /orderProduct     (TOKEN REQUIRED)
- get /orderProduct/:id (TOKEN REQUIRED)
- post /orderProduct    (TOKEN REQUIRED)
    {
      order_id,
      product_id,
      quantity,
      price
    }
- put /orderProduct/:id (TOKEN REQUIRED)
    {
      order_id,
      product_id,
      quantity,
      price
    }
- delete /orderProduct/:id  (TOKEN REQUIRED)

## ENV 
`
DB_URL = 'localhost'
DB_NAME = 'storefront'
DB_USER = 'postgres'
DB_PASSWORD = '2323'
DB_PORT = '3001'

DB_NAME_TEST = 'storefront_test'

SERVER_PORT = '3000'

SALT_ROUNDS = 10
BCRYPT_PASSWORD = 'FWD-DA-BEST'


TOKEN_SECRET = 'JWT-DA-BEST'

ENV= 'dev'
`