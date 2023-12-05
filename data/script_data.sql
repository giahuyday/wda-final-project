INSERT INTO Category (id, Name, description)
VALUES  (1, 'Laptop', 'Laptop gaming, ultrabook'),
		(2, 'HeadPhone', 'in-ear, headphone, airpods'),
        (3, 'Mouse', 'mouse'),
        (4, 'Keyboard', 'mod, gaming, linear, switch');

INSERT INTO Product(id, name, description, price, quantity, category_id)
VALUES  (1, 'Laptop HP 15s-fq2712TU', 'i3-1115G4/ RAM 8GB/ 256GB SSD/ Windows 11', 1000, 10, 1),
        (2, 'ERGO K860 Ergonomic Full-size', 'Wireless/ Windows and Mac/ Palm Rest', 10000, 20, 1),
        (3, 'MX Keys S Advanced Full-size', 'Wireless Scissor Keyboard/ PC and Mac/ Backlit keys', 1000, 10000, 3),
        (4, 'MX Mechanical Full size', 'Wireless Mechanical Tactile Switch/ Windows and Mac/ Backlit Keys', 4, 10000,2),
        (5, 'K380 TKL', 'Wireless Scissor Keyboard/ PC/ Laptop/ Windows/ Mac/ Android/ iPad/ Apple TV', 5, 10000, 3),
        (6, 'Magic Keyboard with Numeric Keypad', 'Wireless  Scissor Keyboard/ Mac computer/  iOS', 6, 10000, 2);

INSERT INTO Image (id, urls, product_id)
VALUES
    ('1', 'https://shorturl.at/foCQY', '1'),
    ('2', 'https://shorturl.at/LMXY4', '2'),
    ('3', 'https://shorturl.at/gyQTX', '3'),
    ('4', 'https://shorturl.at/bkX26', '4'),
    ('5', 'https://shorturl.at/ouT36', '5'),
    ('6', 'https://shorturl.at/anrxW', '6');

insert into Account (id, username, password, name, email, phone, address)
values ('1', 'john_doe', 'password1', 'John Doe', 'john.doe@example.com', '123456789', '123 Main St'),
        ('2', 'jane_smith', 'password2', 'Jane Smith', 'jane.smith@example.com', '987654321', '456 Elm St'),
        ('3', 'bob_johnson', 'password3', 'Bob Johnson', 'bob.johnson@example.com', '555555555', '789 Oak St');

INSERT INTO Cart (id, account_id, product_id)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 1, 3),
    (4, 1, 4),
    (5, 1, 5);

insert into __Order (id, account_id, product_id, quantity, order_status)
values (1, 1, 1, 10, 'in_process'),
        (2, 1, 2, 10, 'in_process'),
        (3, 1, 3, 10, 'in_process'),
        (4, 1, 4, 10, 'in_process'),
        (5, 1, 5, 10, 'in_process'),
        (6, 1, 6, 10, 'in_process')
