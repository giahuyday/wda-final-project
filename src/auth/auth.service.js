function AddtoCart(id) {}

function checkAvailability(param) {
  var parameter = $("#" + param).val();

  // Make an AJAX request to the server to check availability
  $.ajax({
    type: "GET",
    url: "/auth/api/" + param, // Replace with the actual server-side script
    data: { param: param },
    success: function (response) {
      console.log(response);
      // Update the availability status based on the server response
      $("#availability-status").html(response);
    },
  });
}

function update_password(id, new_pass, salt) {
  crypto.pbkdf2(
    new_pass,
    salt,
    10000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        console.log(err);
      }
      try {
        connection.query(
          "UPDATE Account SET password = ? WHERE id = ?",
          [hashedPassword.toString("hex"), id],
          (err, result) => {
            if (err) {
              console.error(err);
            } else {
              console.log(result);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  );
}

module.exports = {
  checkAvailability,
  AddtoCart,
  update_password,
};
