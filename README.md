# Storefront Backend Project
###### Fwd Advanced Full-Stack Web

this project build server side API to manage a store products and orders,
with Express and Postgres.

## usage 

- install postgres.
- create database in postgres.
- change .env file with your custome configration.
- run `npm install` to install and update all package.
- by defult server will run at : `0.0.0.0:3000`.
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

DB_NAME_TEST = 'storefront_test'

SALT_ROUNDS = 10
BCRYPT_PASSWORD = 'FWD-DA-BEST'


TOKEN_SECRET = 'JWT-DA-BEST'

ENV= 'dev'
`