
/// MARK: Styling Function

/* Allows the game box to resize if 
screen height is smaller than width*/

function responsive(){

    let width = window.innerWidth;
    let height = window.innerHeight;

    if ((width - 10) < height) {

        let elements = $('.box');
        
        for (let i = 0; i < elements.length; i++){

            elements[i].style.height = "50vw";
            elements[i].style.width = "50vw";

        }
    }
}

/// MARK: Game Functions

// Holds the function
// to start the game

function countDown(){

    if (!game.playing){
        
        startGame();
        $('.circle-loader').toggleClass('hide');
        game.playing = true;

    }
}

// Call this function every time the 
// user enters the correct colors

function startGame(){

    game.choices = [];
    game.i = 0;

    sumGame();
    addColor();
    play();

}

// Creates the animation 
// to highlight the colors

function play(){

    for (let i = 0; i < game.current.length; i++){

        setTimeout(function(){
            
            highlight(i); 
            
            setTimeout(function(){reverse(i)}, 300, 'i');

        }, 600 * i + 300, 'i');
    }
}

// This makes a color highlighted

function highlight(i){

    let element = game.current[i];

    let audio = new Audio(`audio/${element}.mp3`);

    let box = document.getElementById(element);

    box.classList.toggle('active');

    audio.play();

}

// This makes a color unhighlighted

function reverse(i){

    let element = game.current[i];

    let box = document.getElementById(element);

    box.classList.toggle('active');

    console.log(i);
        
    if (i == game.current.length - 1) {        

        game.listening = true;
        
        $('.box').toggleClass('listening');

    }   
}

// Adds the current game
// step to the counter

function sumGame(){

    $('#count').html(`${game.steps}`);
    game.steps++;

}

// Call this every time a new random 
// color needs to be added to game

function addColor(){

    let currentLength = game.current.length;
    game.current[currentLength] = game.colors[randomColor()];

}

// Generates a random number

function randomColor(){

    let random = Math.floor((Math.random() * 4));

    return random;

}

// This gets called every time 
// user clicks on a game box

function addChoice(color){

    if (game.listening){

        let audio = new Audio(`audio/${color}.mp3`);
        
        audio.play();

        let last = game.choices.length;

        game.choices[last] = color;

        evaluate();

    }
}

// Called every time user adds a choice, and
// checks whether the input is correct or not

function evaluate(){

    let length = game.choices.length;
    let choice = game.choices[length - 1];

    if (choice != game.current[length - 1]){

        gameOver();

        let audio = new Audio("audio/failure.mp3");
        audio.play();
    
    }
    
    if (length == game.current.length){

        success();

    }
}

// Whenever all answers are correct, 
// creates the center tick animation,
// and plays the success audio

function success(){

    $('#count').html("");
    $('.circle-loader').toggleClass('load-complete');
    $('.checkmark').toggle();

    setTimeout(function(){

        startGame();
        $('.circle-loader').toggleClass('load-complete');
        $('.checkmark').toggle();
    
    }, 1500);

    game.listening = false;

    $('.box').toggleClass('listening');

    let audio = new Audio("audio/success.mp3");
    audio.play();

}

// Called when user enters a wrong combination

function gameOver(){

    $('.circle-loader').toggleClass('hide');

    clearTimeout();

    game.choices = [];
    game.current = [];
    game.i = 0;
    game.steps = 0;
    game.playing = false;
    game.listening = false;

    $('.box').toggleClass('listening');

    $('#count').html("Start");

}

/// END Game Functions

/* ---- CODE EXECUTION STARTS HERE ---- */

// On Load

$(function() {

    responsive();
    
});

// Create a Game Session

var game = new Game;

// Event Listeners

$("#counter").click(countDown);

$(".box").click(function(){

    let id = $(this).attr('id');

    addChoice(id);

});