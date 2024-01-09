-- tạo Account mới 
DELIMITER //

CREATE PROCEDURE AddAccount(
  IN p_UserName varchar(50),
  IN p_Password text,
  IN p_Name nvarchar(50),
  IN p_Email varchar(50),
  IN p_Phone varchar(50),
  IN p_Address nvarchar(100),
  IN p_Salt TEXT
)
BEGIN

  DECLARE newAccountID INT;
  DECLARE usernameCount INT;
  
  SELECT COUNT(*) INTO usernameCount FROM Account WHERE UserName = p_UserName;
  
  IF usernameCount > 0 THEN
    SELECT 1 AS Result;
  ELSE
    SET newAccountID = (SELECT COUNT(*) + 1 FROM Account);
    INSERT INTO Account (id, username, password, name, email, phone, address, salt)
    VALUES (newAccountID, p_UserName, p_Password, p_Name, p_Email, p_Phone, p_Address, p_Salt);
    SELECT 0 AS Result, newAccountID AS AccountID;
  END IF;
END //

DELIMITER ;


-- CALL AddAccount('johny', 'password4', 'Johny', '2001-05-04', 8000, 'johny@example.com', '127536789', '123 Main St');
-- ----------------------------------



-- tạo 1 Product mới (dùng cho admin thêm hàng mới để bày bán) chứ ko phải là mua hàng 
DELIMITER //

CREATE PROCEDURE AddProduct(
  IN p_Name nvarchar(50),
  IN p_Price bigint,
  IN p_Description nvarchar(300),
  IN p_CateID INT,
  IN p_Quantity INT
)
BEGIN
  DECLARE newIDCount INT;
  DECLARE newProductID INT;
   
  IF p_CateID IS NULL
	THEN
		SELECT 0 AS Result;
	ELSE	
		SET newIDCount = (SELECT COUNT(*) + 1 FROM Product);
		SET newProductID = newIDCount;
		INSERT INTO Product(ID, Name, Price, Description, category_id, Quantity)
		VALUES (newProductID, p_Name, p_Price, p_Description, p_CateID, p_Quantity);
		SELECT newProductID AS ID;
  END IF;
END //

DELIMITER ;
-- call AddProduct('Laptop test', 1500000, 'i3-1115G4/ RAM 8GB/ 256GB SSD/ Windows 11', 'Silver', 'Available', 'Latop', 'Asus')


-- -------------------------------------
-- thêm 1 ảnh mới vào 
DELIMITER //
CREATE PROCEDURE Add_ProductPicture(
	IN p_ProductID VARCHAR(50),
  IN p_urls VARCHAR(500)
)
BEGIN
    DECLARE v_ProductCount INT;
    DECLARE v_Name NVARCHAR(50);
    DECLARE v_PictureID INT;
    
    SELECT COUNT(*) INTO v_ProductCount FROM Product WHERE id = p_ProductID;
    
    IF v_ProductCount > 0 THEN
        SELECT Name INTO v_Name FROM Product WHERE id = p_ProductID;
        
        SET @count = (SELECT COUNT(*) FROM Image) + 1;
        
        INSERT INTO Image (id, product_id, urls)
        VALUES (@count, p_ProductID, p_urls);
        
        SELECT 1 AS Result; 
    ELSE
        SELECT 0 AS Result; 
    END IF;
END //

DELIMITER ;
-- CALL Add_ProductPicture('Product44', 'https://marketingai.vn/wp-urls/uploads/2023/02/332867346_700587748460794_8977339113547331667_n.jpg');
-- --------------------------


DELIMITER //
CREATE PROCEDURE Add_Product2Cart(
  IN p_AccountID INT,
  IN p_ProductID INT
)
BEGIN
    DECLARE newIDCount INT;
    DECLARE newProductID INT;
    
    SET newIDCount = (SELECT COUNT(*) + 1 FROM Cart);
    SET newProductID = newIDCount;
    INSERT INTO Cart(id, account_id, product_id)
    VALUES (newProductID, p_AccountID, p_ProductID);
    SELECT newProductID AS ID;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE Add_Review(
  IN p_AccountID INT,
  IN p_ProductID INT,
  IN p_review TEXT
)
BEGIN
    DECLARE newIDCount INT;
    DECLARE newProductID INT;
    DECLARE newReview TEXT;

    SET newIDCount = (SELECT COUNT(*) + 1 FROM Review);
    SET newProductID = newIDCount;
    INSERT INTO Review(id, account_id, product_id, review_content)
    VALUES (newProductID, p_AccountID, p_ProductID, p_review);
    SELECT newProductID AS ID;
END //

DELIMITER ;
