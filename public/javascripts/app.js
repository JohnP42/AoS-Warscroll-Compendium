$(document).ready(function() {

  $(".armies").on("click", "button", function(event) {
    event.preventDefault();

    var id = $(this).attr("id");

    $.ajax({
      type: "POST",
      data: {index: id},
      url: "/",
      success: function(data) {
        $(".units").empty();
        $(".units").append(data);
      }
    });
  });

  $("nav a").on("click", function(event) {
    event.preventDefault();

    var id = $(this).attr("id").slice(-1);

    $.ajax({
      type: "POST",
      data: {index: id},
      url: "/armies",
      success: function(data) {
        $(".armies").empty();
        $(".armies").append(data);
      }
    });
  })

});