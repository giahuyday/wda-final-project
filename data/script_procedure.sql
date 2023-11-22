
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
        
        SET @count = (SELECT COUNT(*) FROM image) + 1;
        
        INSERT INTO image (id, product_id, urls)
        VALUES (@count, p_ProductID, p_urls);
        
        SELECT 1 AS Result; 
    ELSE
        SELECT 0 AS Result; 
    END IF;
END //

DELIMITER ;
-- CALL Add_ProductPicture('Product44', 'https://marketingai.vn/wp-urls/uploads/2023/02/332867346_700587748460794_8977339113547331667_n.jpg');
-- --------------------------
