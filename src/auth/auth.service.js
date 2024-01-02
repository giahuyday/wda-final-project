function AddtoCart(id) {}

function checkAvailability(param) {
  var parameter = $("#"+param).val();

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

module.exports = {checkAvailability, AddtoCart}
