var input = '';

/*Each time a number or operator is pressed, this function checks to make sure there aren't more numbers than can fit in the screen div. If there are too many numbers, an "Error" message shows up on the screen. */
var tooManyDigits = function () {
  if (input.length > 11) {
    $("#screen").html("Error");
    input = '';
  }
};
//

$(document).ready(function(){
  
  $(".number, .operator, #decimal").click(function(){
    input += $(this).text();
    $("#screen").html(input);
    tooManyDigits();
   });
  
   $("#equals").click(function(){
     var final = eval(input);
     if (String(final).length > 11) {
       final = String(final).slice(0, 11);
     }
     $("#screen").html(final);
     input = final;
   });
   
   $("#clear").click(function(){
     input = input.slice(0, -1);
     $("#screen").html(input);
   });
   
   $("#allClear").click(function(){
     $("#screen").html("");
     input = ''; 
   }); 
  
}); //end jQuery