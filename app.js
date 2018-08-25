
// add: 

// msg when wrong answer is provided
// timeleft to model, remove global

let timeLeft = 5;

// Model
// data and app logic

const Model = (function () {

    const words = ["compensation", "consciousness", "shift", "knowledge", "pierce",
        "zest", "exempt", "live", "find", "motorist", "session", "quantity", "bread", "advantage"];

    let data = {
        score: 0, 
        timeLeft: 5
    } 

    function handlePickWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        if(!words[randomIndex]) {
            console.log(randomIndex);
        }
        return words[randomIndex];
    }

    function handleUpdateScore(word, userInput) {
        if (word === userInput) {
            data.score++;
        } else {
            data.score = 0;
        }
    }

    function handleTrackGameStatus(handleDisplayGameActive) {
        const intervalId = setInterval(() => {
            handleDisplayGameActive(timeLeft > 0);
        }, 200);
        return intervalId;
    }

    return {
        handlePickWord,
        handleUpdateScore,
        handleTrackGameStatus, 
        data
    }
})();


// View
// UI: display data, take inputs

const View = (function () {

    const displayWordElement = document.getElementById("word");
    const displayScoreElement = document.getElementById("score");
    const timeLeftElement = document.getElementById("time-left");
    const gameOverElement = document.getElementById("game-over");
    const startAgainBtn = document.getElementById("btn");

    function handleDisplayWord(word) {
        displayWordElement.innerHTML = word;
    }

    function handleDisplayScore(score = 0) {
        displayScoreElement.innerHTML = score;
    }

    function handleTakeInput(e) {
        userInput = e.target.value;
        e.target.value = "";
        return userInput;
    }

    function handleDisplayTimeLeft() {
        timeLeft = 5;

        const inervalId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
            }
            timeLeftElement.innerHTML = timeLeft;
        }, 1000);
        return inervalId;
    }

    function handleDisplayGameActive(gameActive) {
        if (gameActive) {
            gameOverElement.innerHTML = "";
            startAgainBtn.disabled = true;
        } else {
            gameOverElement.innerHTML = "Game over";
            startAgainBtn.disabled = false;
        }
    }

    return {
        handleDisplayWord,
        handleDisplayScore,
        handleTakeInput,
        handleDisplayTimeLeft,
        handleDisplayGameActive
    }

})();


// Controll
// add event handlers, run methods provided by other two componnets

const Controller = (function (Model, View) {

    const startGameBtn = document.getElementById("start-game");
    const inputElement = document.getElementById("input");
    const startAgainBtn = document.getElementById("btn");

    startGameBtn.addEventListener("click", init);
    startAgainBtn.addEventListener("click", init);
    inputElement.addEventListener("change", handleTakeInput);

    let word;
    let timeLeftInterval;
    let gameStatusInterval;

    function init() {
        clearInterval(timeLeftInterval);
        clearInterval(gameStatusInterval);
        timeLeftInterval = View.handleDisplayTimeLeft();
        gameStatusInterval = Model.handleTrackGameStatus(View.handleDisplayGameActive);
        word = Model.handlePickWord();
        View.handleDisplayWord(word);
        Model.handleUpdateScore(word);
        View.handleDisplayScore();
        View.handleDisplayGameActive(true);
        startGameBtn.hidden = true;
    }

    function handleTakeInput(e) {
        clearInterval(timeLeftInterval);
        const userInput = View.handleTakeInput(e);
        Model.handleUpdateScore(word, userInput);
        View.handleDisplayScore(Model.data.score);
        word = Model.handlePickWord();
        View.handleDisplayWord(word);
        timeLeftInterval = View.handleDisplayTimeLeft();
    }

})(Model, View);


