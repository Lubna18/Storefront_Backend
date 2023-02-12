CREATE TABLE ORDERS (
    id SERIAL PRIMARY KEY,
    product_id integer,
    quantity integer,
    user_id integer,
    status VARCHAR(8),
    CONSTRAINT FK_user_id FOREIGN KEY(user_id)REFERENCES shop_user(id) ON DELETE CASCADE
);