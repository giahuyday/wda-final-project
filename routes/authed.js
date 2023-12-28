const express = require("express");
const { isAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/my_account", isAuth, function (req, res, next) {
  console.log(req.user.id);
  connection.query(
    "SELECT * FROM Account WHERE id = ?",
    [req.user.id],
    (err, result) => {
      if (err) {
        res.render(err);
        res.send("Failed !");
      } else {
        console.log(result);
        res.render("auth/profile", { title: "My Profile", data: result });
      }
    }
  );
});

router.post("/api/update", isAuth, function (req, res, next) {
  // res.json("Con me may");
  console.log(req.body);
  connection.query(
    "UPDATE Account SET  username = ?, password = ?, name = ?, address = ?, phone = ?, email = ?",
    [
      req.body.username,
      req.body.password,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

module.exports = router;
   