CREATE TABLE Account (
    id INT,
    username VARCHAR(255),
    password TEXT,
    name NVARCHAR(255),
    address NVARCHAR(255),
    phone NVARCHAR(10),
    email VARCHAR(50),
    salt TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_activated BOOLEAN DEFAULT TRUE,
    admin BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (id)
);

CREATE TABLE Product (
    id INT,
    name VARCHAR(50),
    description NVARCHAR(255),
    price BIGINT,
    quantity INT,
	category_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (id)
);

CREATE TABLE Category (
    id INT,
    catename NVARCHAR(255),
    description NVARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Image (
    id INT,
	product_id INT,
    urls NVARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE Cart (
    id INT,
	account_id INT,
    product_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE Review (
    id INT, 
    account_id INT, 
    product_id INT, 
    review_content TEXT,
    PRIMARY KEY (id)
)

CREATE TABLE __Order (
    id INT,
    account_id INT,
    product_id INT,
    quantity INT,
    order_status NVARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

ALTER TABLE Product
ADD CONSTRAINT fk_Product_Category
FOREIGN KEY (category_id) REFERENCES Category(id);

ALTER TABLE Image
ADD CONSTRAINT fk_Image_Product
FOREIGN KEY (product_id) REFERENCES Product(id);

ALTER TABLE Cart
ADD CONSTRAINT fk_Cart_Account
FOREIGN KEY (account_id) REFERENCES Account(id);

ALTER TABLE Cart
ADD CONSTRAINT fk_Cart_Product
FOREIGN KEY (product_id) REFERENCES Product(id);

ALTER TABLE CartItems
ADD CONSTRAINT fk_CartItmes_Product
FOREIGN KEY (product_id) REFERENCES Product(id)

ALTER TABLE __Order
ADD CONSTRAINT fk_Order_Product
FOREIGN KEY  (product_id) REFERENCES Product(id);

ALTER TABLE Review
ADD CONSTRAINT fk_Review_Account
FOREIGN KEY (account_id) REFERENCES Account(id);

ALTER TABLE Review
ADD CONSTRAINT fk_Review_Product
FOREIGN KEY (product_id) REFERENCES Product(id);

ALTER TABLE Wislist
ADD CONSTRAINT fk_Wislist_Account
FOREIGN KEY (account_id) REFERENCES Account(id);

ALTER TABLE Wislist
ADD CONSTRAINT fk_Wislist_Product
FOREIGN KEY (product_id) REFERENCES Product(id);