// variables
var playerMoves = 0;
var gameCards;
var matchedCards;
var selections = [];

// new game
function newGame() {
    shuffleCards();
    resetGame();
}

// reset , flip cards over, remove classes
function resetGame() {
    $('#gameOver').hide();
    clearGame();
    playerMoves = 0;
    // console.log("Player moves after zeroing: " + playerMoves);
    $('#game-cards').children().click(function(){
        playerMoves ++;
        // console.log("Player moves after click: " + playerMoves);
        $(this).addClass('selected');
        selections.push($(this));
        // console.log("Added to selections:" + selections); 
        if (selections.length === 2) {
            isAMatch();       
            // console.log('check for a match now');
        }
        if (selections.length > 2) {
            // console.log('more than 3 selected, reset all the cards and leave the 3rd card selected');
            //clear selections
            selections = [];
            // console.log("Selections should be 0: " + selections);
            selections.push($(this));
            $(this).siblings().removeClass('selected');
            //add in the last selected card
        }
    });
}

function clearGame() {
    //remove the matched and selected classes from all cards (works)
    $('#game-cards').children().removeClass('matched');
    $('#game-cards').children().removeClass('selected'); 
    //clear the array
    $('#game-cards').empty();
    $('#game-cards').append(gameCards);
}    
//
function shuffleCards() {
    clearGame();
    //shuffle the cards
    shuffle(gameCards);
    // console.log(gameCards);
}

// shuffle cards
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue; 
  var randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// determine if 2 cards match
function isAMatch () {
    if (selections[0].attr('class') === selections[1].attr('class')) {
        $(selections[0]).addClass('matched');
        $(selections[1]).addClass('matched');
        endOfGame();
        // console.log(selections[0]);       
        // console.log(selections[1]);
    }
}

function endOfGame() {
    //if all of the ('#game-cards').children() have a class of matched, then win
    var matchedCards = document.getElementsByClassName('matched');
    if (matchedCards.length === 24) {
        //put playerMoves variable into the Span ID number-of-moves
        // alert(playerMoves + " Moves");
        $('#number-of-moves').html(playerMoves);
        $('#gameOver').show();
        return;
        playerMoves = 0;
    }; 
}

// main function
$(document).ready(function(){
    gameCards = $('#game-cards').children();
    //console.log(gameCards);
    newGame();
    //event handlers - watch for New Game, Reset Game buttons
    $('#start').on('click', newGame);
    $('#reset').on('click', resetGame);

});
