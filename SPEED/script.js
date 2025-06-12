let startTime, timerInterval;
let testText = document.getElementById("text-to-type").innerText;
const inputField = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

function startTest() {
    inputField.value = "";
    inputField.disabled = false;
    startTime = new Date();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    inputField.focus();
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.innerText = elapsedTime;
    calculateResults();
}

function calculateResults() {
    const typedText = inputField.value;
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const elapsedTime = (new Date() - startTime) / 60000; // in minutes
    const wpm = Math.round(wordsTyped / elapsedTime);
    wpmDisplay.innerText = isFinite(wpm) ? wpm : 0;

    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === testText[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / testText.length) * 100);
    accuracyDisplay.innerText = accuracy;
}

inputField.addEventListener("input", calculateResults);
startTest();