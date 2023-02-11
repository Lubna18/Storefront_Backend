CREATE TABLE shop_user(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(200)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    price integer,
    category VARCHAR(15)
);

CREATE TABLE ORDERS (
    id SERIAL PRIMARY KEY,
    product_id integer,
    quantity integer,
    user_id integer,
    status VARCHAR(8),
    CONSTRAINT FK_user_id FOREIGN KEY(user_id)REFERENCES shop_user(id) ON DELETE CASCADE
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES product(id)
);