// start the game
var startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startGame);

// restarts the game
var startOver = document.getElementById('play-again');
startOver.addEventListener('click', playAgain);

var welcomeEnv = document.getElementById('start');
var gameEnv = document.getElementById('game');


var chosenWordsList;
var chosenWords = [];
var chosenPassword = '';
var trials = 0;
var maxTrials = 3;


// chooses words and selects the password
function startGame() {
    // set display of welcome env to none
    welcomeEnv.style.display = "none";
    gameEnv.style.display = "grid";

    // pick 7 random letters from words
    for (let i = 0; i < 7; i++) {
        var idx = Math.floor(Math.random() * words.length);
        // Push the chosen letters into chosenWords array
        chosenWords.push(words[idx]);
    }
    // Choose a random word from chosenWords
    var chosenPasswordIdx = Math.floor(Math.random() * chosenWords.length);
    chosenPassword = chosenWords[chosenPasswordIdx];
    showGame(chosenWords);
}

// Restructures the DOM to display the selected passwords
function showGame(chosenWords) {
    var wordContainer = document.getElementById('word-container');
    for (let i = 0; i < chosenWords.length; i++) {
        wordContainer.insertAdjacentHTML('beforeend', `<li class="chosen-word">${chosenWords[i]}</li>`);
    }

    // Get all the words on the list and attach to variable
    chosenWordsList = document.getElementsByClassName('chosen-word');

    // Play game
    playGame(chosenWordsList);
}

// Play game function
function playGame(words) {
    for (let i = 0; i < words.length; i++) {
        words[i].addEventListener('click', () => {
            // increase trials by 1 and show the player
            trials += 1;
            document.getElementById('trials').textContent =  `${maxTrials - trials}`
            // Set condition for maximum trials
            if(trials > 3){
                document.getElementById('trials').textContent =  `No`;
                return;
            }
            // Check if word equals chosen password
            var condition = words[i].textContent == chosenPassword ? true : false;
            if (!condition) {
                words[i].classList.add('invalid');
                var correctLetters = [...words[i].textContent].filter(letter => {
                    return chosenPassword.indexOf(letter) !== -1;
                });
                words[i].textContent = `${words[i].textContent}--------> has ${correctLetters.length} correct letters.`;
                return;
            }
            var correctPassword = words[i].textContent;
            words[i].classList.add('correct');
            words[i].textContent = `${correctPassword} -----> Your Guess is Correct`;

            // Set trials to 4
            trials = 4;
            document.getElementById('trials').textContent =  `No`;
        });
    }
}


// Play again
function playAgain() {
    // reset the game
    reset();

    document.getElementById('trials').textContent =  `${maxTrials}`
    // Clear the DOM
    document.getElementById('word-container').innerHTML = '';

    // start game all over
    startGame();
}

// reset
function reset() {
    chosenPassword = '';
    chosenWords = [];
    chosenWordsList = [];
    trials = 0;
}