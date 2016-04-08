var alreadyChosenPlayer = [],
    alreadyChosenComp = [],
 //All possible winning tic tac toe combinations //
    winners = [ 
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ],
    board = {
      1:"",
      2:"",
      3:"",
      4:"",
      5:"",
      6:"",
      7:"",
      8:"",
      9:""
    },
    playerChoice,
    compChoice,
    winner = "";

//Board isn't visible until player chooses a letter
$(".board").hide();

//Player chooses X //
$("#X").click(function(){
  $(".openingLine").hide();
  $("#part2").hide();
  playerChoice = "X";
  compChoice = "O";
  $(".board").show();
});
//

//Player chooses O, computer goes first //
$("#O").click(function(){
  $(".openingLine").hide();
  $("#part2").hide();
  playerChoice = "O";
  compChoice = "X";
  $(".board").show();
  compTurn();
});
//

//Allows player to re-choose X or O before starting new game//
$(".letterChange").click(function(){
  $("#myModal").hide();
  $(".openingLine").show();
  $(".board").hide();
  alreadyChosenPlayer = [];
  alreadyChosenComp = [];
  winner = "";
  $("p", ".box").html("");
  $(".modal-content p").html("");
   $(".box").css({
    "pointer-events": "auto"
});
  for (var key in board) {
    board[key] = "";
  }
});
//

//Allows player to close modal box that pops up with outcome of the game //
//Also resets info for the next game //
$(".close").click(function(){
  $("#myModal").hide();
  alreadyChosenPlayer = [];
  alreadyChosenComp = [];
  winner = "";
  $("p", ".box").html("");
  $(".modal-content p").html("");
  for (var key in board) {
    board[key] = "";
  }
   $(".box").css({
    "pointer-events": "auto"
});
  if (compChoice === "X") {
    compTurn();
  }
});
//

//PLAYER'S TURN //
  $(".box").click(function(){ 
    var currentSquare = Number(this.id.charAt(6));
    if (alreadyChosenPlayer.indexOf(currentSquare) === -1 && alreadyChosenComp.indexOf(currentSquare) === -1) {
      $("p", this).html(playerChoice);
      alreadyChosenPlayer.push(currentSquare);
      board[currentSquare] = playerChoice;
 //Checks for winner after each turn //
      checkForWinnerPlayer();
      if (winner === "player") {
        playerWinner();
      }
 //If player didn't win but board is full, game ends in a tie //
      else if (alreadyChosenPlayer.length + alreadyChosenComp.length === 9)       {
        tieGame();
      }
//Otherwise, computer's turn! //
      else {
        compTurn();
      }  
    }
  });
//

//Checks if computer has any possible moves that will end in a win //
function compTryToWin() {
    for (var i = 0; i < winners.length; i++) {
      if (board[winners[i][0]] == compChoice && board[winners[i][1]] == compChoice && board[winners[i][2]] == "") {
        return winners[i][2];
      }
      else if (board[winners[i][0]] == compChoice && board[winners[i][2]] == compChoice && board[winners[i][1]] == "") {
        return winners[i][1];
      }
       else if (board[winners[i][1]] == compChoice && board[winners[i][2]] == compChoice && board[winners[i][0]] == "") {
        return winners[i][0];
      } 
  }
  return false;
};

//Checks if player is close to winning and where to place letter to block player //
function compBlock(){
  for (var i = 0; i < winners.length; i++) {
      if (board[winners[i][0]] == playerChoice && board[winners[i][1]] == playerChoice && board[winners[i][2]] == "") {
        return winners[i][2];
      }
      else if (board[winners[i][0]] == playerChoice && board[winners[i][2]] == playerChoice && board[winners[i][1]] == "") {
        return winners[i][1];
      }
       else if (board[winners[i][1]] == playerChoice && board[winners[i][2]] == playerChoice && board[winners[i][0]] == "") {
        return winners[i][0];
      } 
  }
  return false;
};

// COMPUTER'S TURN //
function compTurn(){
 // Tries to go in middle square first //
    if (alreadyChosenPlayer.indexOf(5) === -1 &&  alreadyChosenComp.indexOf(5) === -1){
      alreadyChosenComp.push(5);
      board[5] = compChoice;
      $("p", "#square5").html(compChoice).hide().delay(200).fadeIn(200);
    }
// If middle square is already filled... //
else {
    var current = compTryToWin();
    var current2 = compBlock();
//First looks for a spot that will end in a win //
     if (current !== false) {
    alreadyChosenComp.push(current);
      board[current] = compChoice;
      $("p", "#square"+current).html(compChoice).hide().delay(200).fadeIn(200);
      compWinner();
}
//If that's not possible, looks for a spot that will block player from winning //
  else if (current2 !== false) {
    alreadyChosenComp.push(current2);
    board[current2] = compChoice;
    $("p", "#square"+current2).html(compChoice).hide().delay(200).fadeIn(200);
    if (alreadyChosenPlayer.length + alreadyChosenComp.length === 9) {
      tieGame();
    }
  }
//If that doesn't work either, uses a random number to choose square //
    else {
    var randomSquare = Math.floor(Math.random() * 9) + 1;
    if (alreadyChosenComp.indexOf(randomSquare) === -1 && alreadyChosenPlayer.indexOf(randomSquare) === -1){
    alreadyChosenComp.push(randomSquare);
     board[randomSquare] = compChoice;
     $("p", "#square"+randomSquare).html(compChoice).hide().fadeIn(1500);
//Checks if computer has a win //    
     checkForWinnerComp();
      if (winner === "comp") {
       compWinner();
      }
 //If not, checks for a tie //
    else if (alreadyChosenComp.length + alreadyChosenPlayer.length === 9 && winner !== "comp") {
      tieGame();
    }
   }
//If random number found above represents a square already taken on the board, function repeats until a number representing a square not taken is found. //
    else {
      compTurn();
     }
    }
   }
};
//

//Code to run if computer wins //
function compWinner() {
 //Player can't click on any more squares //
  $(".box").css({
    "pointer-events": "none"
});
  //
  $(".modal-content p").append("Computer wins!");
  $("#myModal").delay(1400).fadeIn(600);
};
//

//Code to run if player wins //
function playerWinner(){
   $(".box").css({
    "pointer-events": "none"
});
   $(".modal-content p").append("You win!");
   $("#myModal").delay(600).fadeIn(600);
};
//

//Code to run if it's a tie //
function tieGame() {
   $(".box").css({
    "pointer-events": "none"
});
  $(".modal-content p").append("It's a tie!");
  $("#myModal").delay(700).fadeIn(600);
};
//

//Cycles through arrays of possible winning combinations and checks if the player has a letter placed in all three. //
function checkForWinnerPlayer(){
   var counter = 0;
    for (var i = 0; i < winners.length; i++){
      for (var j = 0; j < 3; j++) {  
        if (alreadyChosenPlayer.indexOf(winners[i][j]) === -1) {
            break;
           }
         else {
            counter += 1;
            }
          if (counter === 3) {
           winner = "player";
        }
      }
      counter = 0;
    }
};
//

//Cycles through arrays of possible winning combinations and checks if the computer has a letter placed in all three. //
function checkForWinnerComp(){
  var counter = 0;
    for (var i = 0; i < winners.length; i++){
      for (var j = 0; j < 3; j++) {  
        if (alreadyChosenComp.indexOf(winners[i][j]) === -1) {
            break;
           }
         else {
            counter += 1;
            }
          if (counter === 3) {
            winner = "comp";
        }
      }
      counter = 0;
    }
};
//