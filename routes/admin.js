const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'AdminSite' });
});

module.exports = router;
