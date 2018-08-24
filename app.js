// Model
// data and app logic

let score = 0;

const Model = (function () {
    const words = ["compensation", "consciousness", "shift", "knowledge", "pierce",
        "zest", "exempt", "live", "find", "motorist", "session", "quantity", "bread", "advantage"];

    function handlePickWord() {
        const randomIndex = Math.floor(Math.random() * words.length) + 1;
        return words[randomIndex];
    }

    // add handle wrong answer, handle time expired

    function handleUpdateScore(word, userInput) {
        if (userInput === word) {
            score++;
        } else {
            score = 0;
        }
    }

    function handleTrackGameStatus() {

    }

    return {
        score,
        handlePickWord,
        handleUpdateScore
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
        return userInput
    }

    function handleDisplayTimeLeft() {
        const timeLeftElement = document.getElementById("time-left");
        let timeLeft = 5;
        const inervalId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
            }
            timeLeftElement.innerHTML = timeLeft;
        }, 1000);
        return inervalId;
    }

    return {
        handleDisplayWord,
        handleDisplayScore,
        handleTakeInput,
        handleDisplayTimeLeft,
        userInput
    }

})();


// Controll
// add event handlers, run methods provided by other two componnets

const Controller = (function (Model, View) {

    const inputElement = document.getElementById("input");
    
    window.addEventListener("load", init);
    inputElement.addEventListener("change", handleTakeInput);

    let word;
    let intId;

    function init() {
        word = Model.handlePickWord();
        Model.handleUpdateScore(word);
        View.handleDisplayWord(word);
    }

    function handleTakeInput(e) {
        clearInterval(intId);
        const userInput = View.handleTakeInput(e);
        Model.handleUpdateScore(word, userInput);
        View.handleDisplayScore(score);
        word = Model.handlePickWord();
        View.handleDisplayWord(word);
        intId = View.handleDisplayTimeLeft();
    }

})(Model, View);


