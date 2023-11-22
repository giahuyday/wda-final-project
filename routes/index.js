const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   // Query data from MySQL
   connection.query('SELECT * FROM product, image WHERE product.id = image.product_id', (error, results) => {
    if (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
        return;
    }

    // Render the page with data from MySQL
    res.render('index', { data: results });
  })
});

  
module.exports = router;
