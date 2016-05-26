$(document).ready(function() {

  $(".army-list button").on("click", function(event) {
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

});