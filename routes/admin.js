const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  // res.render('admin', { title: 'AdminSite' });
  if(req.isAuthenticated()){
    return res.status(200).render('admin', {title: "Admin Site"})
  }
  else{
    res.json('You are not admin')
  }

})


router.get('/add_product', function(req, res, next){
  if(req.isAuthenticated()){
    return res.status(200).render('admin/addproduct', {title: "Add new Product"})
  }
  else{
    res.json('You are not allowed to view this site')
  }
})
module.exports = router;
