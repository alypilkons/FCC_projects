var currColor,
    gameArray = [],
    counter = 0,
    turnCount = 1,
    audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    audioRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    audioYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    strictMode = false,
    replay = false;

$(".gameBoard").css({
    "pointer-events": "none"
  });

//Strict Mode toggle//
$(".strict").click(function(){
  $(".strict").toggleClass("strictEnabled");
  if (strictMode) {
    strictMode = false;
  }
  else {
    strictMode = true;
  }
});
//

//Returns a random color name //
function randomColor(){
  switch(Math.floor(Math.random() * 4) + 1) {
    case 1:
      return "green";
      break;
    case 2:
      return "red";
      break;
    case 3:
      return "yellow";
      break;
    case 4:
      return "blue";
      break;    
  }
};
//

//Returns a sound based on color of shape//
function playSound(color) {
  if (color == "green") {
    audioGreen.play();
  }
  else if (color == "red") {
    audioRed.play();
  }
  else if (color == "yellow") {
    audioYellow.play();
  }
  else if (color == "blue") {
    audioBlue.play();
  }
};
//

//START button (resets and restarts game) //
$(".start").click(function(){
  gameArray = [];
  $("#fullScore").html("<p id='fullScore'>Level: <span id='scoreHere'>1</span></p>");
  $("#fullScore").css({fontSize: "1em"})
  counter = 0;
  turnCount = 1;
  currColor = randomColor();
  gameArray.push(currColor);
  $("#"+currColor).fadeTo("slow", 0.6).fadeTo("fast", 1);
  playSound(gameArray[0]);
  $(".gameBoard").css({
    "pointer-events": "auto"
  });
});
//

//PLAYER CLICKS A SHAPE //
$(".gameSquare").click(function(){
  var current = this.id;
  playSound(current);
  $(this).fadeTo("slow", 0.6).fadeTo("fast", 1);
  counter += 1;
 //if shape clicked doesn't match sequence (in strict mode)//
  if (current != gameArray[counter - 1] && strictMode) {
    $("#fullScore").html("<p>Game over!</p>");
    $("#fullScore").animate({
      fontSize: "3em"
    }, 1000);
    $(".gameBoard").css({
      "pointer-events": "none"
    });
  }
//if shape clicked doesn't match sequence (not in strict mode)//
  else if (current != gameArray[counter - 1]) {
    $("#fullScore").html("<p><strong>Try again!</strong></p>");
    $("#fullScore").animate({
      fontSize: "2.5em"
    }, 1000);
    $("#fullScore").animate({
      fontSize: "1em"
    }, compTurn);
   replay = true;
   counter = 0;
  }
 //sequence is finished and matches, computer's turn!
  else if (counter === gameArray.length && gameArray.length < 20) {
    turnCount += 1;
    counter = 0;
    compTurn();
  }
 //sequence is finished and matches, 20 in a row - you win!
  else if (counter === gameArray.length && gameArray.length === 20) {
    $("#fullScore").html("<p>You Win!!!</p>");
    $("#fullScore").animate({
      fontSize: "3em"
    }, 1000);
    $(".gameBoard").css({
    "pointer-events": "none"
    });
  }
//no "else" option - if none of these apply, player must continue clicking shapes
});
//

//Function that replays sequence each turn  
function compLoop(i, startNum, gameArray) {
  var duration;
//sequence plays faster depending on how long the sequence is
  if (gameArray.length < 8) {
    duration = 1000;
  }
  else {
    duration = 700;
  }
  setTimeout(function(){
    $("#"+gameArray[startNum]).fadeTo("slow", 0.6).fadeTo("fast", 1);
    playSound(gameArray[startNum]);
    if (--i) {
      startNum += 1;
      compLoop(i, startNum, gameArray);
    }
  }, duration);
  }(gameArray.length);
//

//COMPUTER'S TURN //
function compTurn() {
//if player messed up sequence and computer is replaying same sequence, first remove 'try again' message
  if (replay) {
    var level = gameArray.length;
    $("#fullScore").html("<p id='fullScore'>Level: <span id='scoreHere'>"+level+"</span></p>");
  }
//player successfully remembered sequence; computer adds a new shape to the end
  if (replay == false){
    $("#scoreHere").html(turnCount);
    /*var duration = 1000;*/
    currColor = randomColor();
    gameArray.push(currColor);
  }
//play sequence of shapes for the player!
  var i = gameArray.length;
  compLoop(i, 0, gameArray);
  replay = false;
};
//