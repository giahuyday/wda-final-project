const express = require('express');
const router = express.Router();
const connection = require('./connection')
/* GET home page. */
router.get('/', function(req, res, next) {
   // Query data from MySQL
   connection.query('SELECT * FROM Product, Image WHERE Product.id = Image.product_id', (error, results) => {
    console.log(results)
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
