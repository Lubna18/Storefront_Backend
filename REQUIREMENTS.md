# API
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products

- Index
GET http://127.0.0.1:3000/products

- Show
GET http://127.0.0.1:3000/product/:id

- Create [token required]
POST http://127.0.0.1:3000/product
body sample
{
      "name": "product2",
      "price": "22",
      "category": "B"
}

- Delete
DELETE http://127.0.0.1:3000/product/:id

- [OPTIONAL] Products by category (args: product category)

#### Users

- First User
Creates user and return JWT token to be used
POST http://127.0.0.1:3000/firstuser
body sample
{
    "firstName": "Lubna",
    "lastName": "AbdelSalam",
    "password": "3456"
}

- Index [token required]
GET http://127.0.0.1:3000/users

- Show [token required]
GET http://127.0.0.1:3000/user/:id


- Create N[token required]
POST http://127.0.0.1:3000/user
body sample 
{
    "firstName": "Mona",
    "lastName": "Mohamed",
    "password": "3456"
}

- Delete [token required]
DELETE http://127.0.0.1:3000/user/:id


#### Orders

- Create [token required]
POST http://127.0.0.1:3000/orders
body sample 
{
    "productId": "1",
    "quantity": "45",
    "userId": "1",
    "status": "active"
}

- index [token required]
GET http://127.0.0.1:3000/orders

- addProduct [token required]
Add product to order
POST http://127.0.0.1:3000/orders/:orderid/products
body sample
{
    "productId": "1",
    "quantity": "3"
}

- Current Order by user (args: user id)[token required]
GET http://127.0.0.1:3000/orders/:id

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### Dashboard
- [OPTIONAL] Top 5 most popular products 
GET http://127.0.0.1:3000/five-most-expensive

- Products in orders
GET http://127.0.0.1:3000/products_in_orders

- Users with orders
GET http://127.0.0.1:3000/users-with-orders

## Data Shapes
#### Product
 id SERIAL PRIMARY KEY,
name VARCHAR(200),
price integer,
category VARCHAR(15)

#### shop_user
id SERIAL PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
password VARCHAR(200)

#### Orders
product_id integer,
quantity integer,
user_id integer,
status VARCHAR(8), [(active or complete)]
CONSTRAINT FK_user_id FOREIGN KEY(user_id)REFERENCES shop_user(id) ON DELETE CASCADE

#### order_products [Orders many to many with Products]
id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES product(id)

