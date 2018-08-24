let score = 0;
let timeLeft = 5;

// Model
// data and app logic


const Model = (function () {
    const words = ["compensation", "consciousness", "shift", "knowledge", "pierce",
        "zest", "exempt", "live", "find", "motorist", "session", "quantity", "bread", "advantage"];

    function handlePickWord() {
        const randomIndex = Math.floor(Math.random() * words.length) + 1;
        return words[randomIndex];
    }

    function handleUpdateScore(word, userInput) {
        if (userInput === word) {
            score++;
        } else {
            score = 0;
        }
    }

    function handleTrackGameStatus(handleDisplayGameActive) {
        const intervalId = setInterval(() => {
            handleDisplayGameActive(timeLeft > 0);
        }, 200);

        return intervalId;
    }

    return {
        score,
        handlePickWord,
        handleUpdateScore,
        handleTrackGameStatus
    }
})();


// View
// UI: display data, take inputs

const View = (function () {

    let userInput = "";

    function handleDisplayWord(word) {
        const displayWordElement = document.getElementById("word");
        displayWordElement.innerHTML = word;
    }

    function handleDisplayScore(score) {
        const displayScoreElement = document.getElementById("score");
        displayScoreElement.innerHTML = score;
    }

    function handleTakeInput(e) {
        userInput = e.target.value;
        e.target.value = "";
        return userInput;
    }


    function handleDisplayTimeLeft() {
        const timeLeftElement = document.getElementById("time-left");
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
        const gameOverElement = document.getElementById("game-over");
        const startAgainBtn = document.getElementById("btn");

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
        handleDisplayGameActive,
        userInput
    }

})();


// Controll
// add event handlers, run methods provided by other two componnets

const Controller = (function (Model, View) {

    const inputElement = document.getElementById("input");
    const startAgainBtn = document.getElementById("btn");


    window.addEventListener("load", init);
    inputElement.addEventListener("change", handleTakeInput);
    startAgainBtn.addEventListener("click", init);

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
        View.handleDisplayScore(0);
        View.handleDisplayGameActive(true);
    }

    function handleTakeInput(e) {
        clearInterval(timeLeftInterval);
        const userInput = View.handleTakeInput(e);
        Model.handleUpdateScore(word, userInput);
        View.handleDisplayScore(score);
        word = Model.handlePickWord();
        View.handleDisplayWord(word);
        timeLeftInterval = View.handleDisplayTimeLeft();
    }

})(Model, View);


