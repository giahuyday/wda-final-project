const express = require("express");
const { isAdmin } = require("../../middleware/auth");
// const { connection } = require("./connection");
const router = express.Router();

// Sử dụng layout cho admin
router.use(isAdmin, function (req, res, next) {
  res.locals.layout = "admin/admin_layout";
  next();
});

/* GET home page. */
router.get("/index", function (req, res, next) {
  // res.render('admin', { title: 'AdminSite' });
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .render("admin", { title: "Admin Site", layout: "admin/admin_layout" });
  } else {
    res.json("You are not admin");
  }
});

router.get("/add_product", function (req, res, next) {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .render("admin/addproduct", { title: "Add new Product" });
  } else {
    res.json("You are not allowed to view this site");
  }
});

router.get("/index_table", function (req, res, next) {
  if (req.isAuthenticated()) {
    connection.query(
      "SELECT * FROM Account WHERE id != ?",
      [req.user.id],
      (err, result, next) => {
        if (err) {
          res.send(err);
        }
        return res.status(200).render("admin/tables/user", {
          title: "Admin Site",
          layout: "admin/admin_layout",
          data: result,
        });
      }
    );
  } else {
    res.json("You are not admin");
  }
});

router.get("/product_list", function (req, res, next) {
  if (req.isAuthenticated()) {
    connection.query("SELECT * FROM Product", (err, result, next) => {
      if (err) {
        res.send(err);
      }
      console.log(result)
      return res.status(200).render("admin/tables", {
        title: "Admin Site",
        layout: "admin/admin_layout",
        data: result,
      });
    });
  } else {
    res.json("You are not admin");
  }
});

router.get("/ban", function (req, res, next) {
  const id = req.query.id;

  // Kiểm tra xem username có được cung cấp không
  if (!id) {
    return res.status(400).send("Missing username parameter");
  }

  connection.query(
    "UPDATE Account SET is_activated = 0 WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send('0');
      }
    }
  );
});

router.get("/lock_product", function (req, res, next) {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send("Missing Product ID");
  }

  connection.query("UPDATE Product SET is_deleted = 1 WHERE id = ? AND is_deleted = 0", [id], (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.status(200).send("1")
    }
  });
});
module.exports = router;
