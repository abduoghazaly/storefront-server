CREATE TABLE users ( id SERIAL PRIMARY KEY,firstName VARCHAR(50), lastName VARCHAR(50), email VARCHAR(150) UNIQUE, password char(60)); 
CREATE TABLE categories ( id SERIAL PRIMARY KEY, name VARCHAR(60) UNIQUE , description VARCHAR(150)); 
CREATE TABLE orders ( id SERIAL PRIMARY KEY, status integer, user_id integer REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(60) UNIQUE , description VARCHAR(150), price DECIMAL, category_id integer REFERENCES categories(id) ON DELETE CASCADE);
CREATE TABLE ordersproducts ( id SERIAL PRIMARY KEY, order_id  integer REFERENCES orders(id) ON DELETE CASCADE, product_id integer REFERENCES products(id) ON DELETE CASCADE, quantity DECIMAL , price DECIMAL);