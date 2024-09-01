CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name NVARCHAR(255),
    user_mail NVARCHAR(255),
    user_password NVARCHAR(255),
    phone NVARCHAR(12),
    user_address NVARCHAR(255),
    salt TEXT,

    created_at DATETIME DEFAULT(NOW()),
    updated_at DATETIME DEFAULT(NOW()),

    is_admin BOOLEAN DEFAULT(0),
    is_activated BOOLEAN DEFAULT(1)
);

CREATE TABLE category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cate_name NVARCHAR(255),
    cate_description NVARCHAR(255),

    created_at DATETIME DEFAULT(NOW()),
    updated_at DATETIME DEFAULT(NOW()),

    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE product(
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name NVARCHAR(255),
    product_description NVARCHAR(255),

    stock INT,
    user_id INT,
    cate_id INT,
    created_at DATETIME DEFAULT(NOW()),
    updated_at DATETIME DEFAULT(NOW()),

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (cate_id) REFERENCES category(id)
);

CREATE TABLE CART(
    id INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_at DATETIME DEFAULT(NOW()),
    updated_at DATETIME DEFAULT(NOW()),

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
)

CREATE TABLE avatar(
    id INT PRIMARY KEY AUTO_INCREMENT,
    url NVARCHAR(255),

    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE
    
    FOREIGN KEY (user_id) REFERENCES user(id)
)