var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=';

$(".submitButton").click(function(){
  $("#information").html("");
  var input = $(".searchBox").val();
  wikiSearch(input);
  });

$(".searchBox").keypress(function(e){
  if (e.which === 13) {
    $("#information").html("");
    var input = $(".searchBox").val();
    wikiSearch(input);
  }
})
 
var wikiSearch = function(input) {
  $.getJSON(url+input+"&callback=?", function(data) {
    if (data[1].length < 1) {
      $("#information").html("<p>Sorry, no results found.</p>");
    }
    $("#information").hide();
    for (var i = 0; i < data[1].length; i++) {
    $("#information").append("<a class='title' href=" + data[3][i] + " target='_blank'><div class='result'><p class='title' id='boldTitle'>" + data[1][i] + "</p><p>" + data[2][i] + "</p></div></a>"); 
  }
    $("#information").fadeIn("slow");
  });
 }; 
