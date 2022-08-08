# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                                                                 get /product  
- Show                                                                  get /product/:id
- Create [token required]                                               post /product   
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]                                                get /user   
- Show [token required]                                                 get /user/:id 
- Create N[token required]                                              post /user

#### Orders
- Current Order by user (args: user id)[token required]                 get /orderByUser/:id
- [OPTIONAL] Completed Orders by user (args: user id)[token required]   get /complatedOrdersByUser/:id

## Data Shapes
#### Category
- id                SERIAL PRIMARY KEY
- name              VARCHAR(60) UNIQUE
- description       VARCHAR(150)

#### Product
-  id               SERIAL PRIMARY KEY
- name              VARCHAR(60) UNIQUE
- price             DECIMAL
- description       VARCHAR(150)
- category_id       integer REFERENCES categories(id)

#### User
- id                SERIAL PRIMARY KEY
- firstName         VARCHAR(50)
- lastName          VARCHAR(50)
- email             VARCHAR(150) UNIQUE
- password          char(60)

#### Orders
- id                SERIAL PRIMARY KEY
- status            VARCHAR(60)
- user_id           integer REFERENCES users(id)

#### Ordersproducts
- id                SERIAL PRIMARY KEY
- order_id          integer REFERENCES orders(id)
- product_id        integer REFERENCES products(id)
- quantity          DECIMAL
- price             DECIMAL