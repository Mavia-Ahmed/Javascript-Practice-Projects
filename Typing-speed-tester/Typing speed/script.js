const quoteDisplay = document.getElementById("quote");
const inputField = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timer;
let time = 0;
let quote = "";
let correctChars = 0;
let totalChars = 0;
let started = false;

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is a versatile programming language.",
    "Coding is both an art and a science.",
    "Practice makes a person perfect in coding."
];

function getNewQuote() {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = quote;
}

function startTimer() {
    if (!started) {
        started = true;
        timer = setInterval(() => {
            time++;
            timerDisplay.textContent = time;
        }, 1000);
    }
}

inputField.addEventListener("input", () => {
    startTimer();
    totalChars = inputField.value.length;
    correctChars = 0;
    
    for (let i = 0; i < totalChars; i++) {
        if (inputField.value[i] === quote[i]) {
            correctChars++;
        }
    }
    
    let accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;
    accuracyDisplay.textContent = accuracy.toFixed(2);
    
    if (inputField.value === quote) {
        clearInterval(timer);
        let wpm = Math.round((quote.length / 5) / (time / 60));
        wpmDisplay.textContent = wpm;
    }
});

function resetTest() {
    clearInterval(timer);
    time = 0;
    started = false;
    timerDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    inputField.value = "";
    getNewQuote();
}

document.addEventListener("DOMContentLoaded", getNewQuote);
