const questions = [
    "Select all 🟩 cells that are both EVEN AND immediate left of 🟥",
    "Select all 🟩 cells that are ODD OR NOT directly below 🟥",
    "Select all 🟨 cells that are NOT EVEN numbers",
    "Select all (🟥 cells OR 🟨 cells) that are ODD",
    "Select all cells that are 🟩 AND NOT horizontally adjacent to 🟥",
    "Select all 🟨 cells that are NOT directly below 🟥",
    "Select all 🟩 cells that are NOT EVEN OR directly below 🟥",
    "Select all 🟨 cells that are directly below 🟩 AND directly above 🟥"
];

const gridColors = [
    "red", "yellow", "red", "green", "red",
    "green", "red", "yellow", "green", "red",
    "yellow", "green", "red", "yellow", "green",
    "red", "yellow", "green", "red", "yellow",
    "green", "red", "yellow", "green", "red",
    "yellow", "green", "red", "yellow", "green"
];

const correctAnswers = [
    [4, 6, 12, 18, 24],
    [4, 9, 21, 27, 15],
    [11, 17, 23, 29],
    [1, 3, 5, 7, 11, 13, 17, 19, 23, 25, 29],
    [15, 30],
    [2, 11, 14, 17, 20, 23, 26, 29],
    [9, 12, 15, 18, 21, 24, 27, 30],
    [11, 14, 17, 20, 23]
];

let currentLevel = 0;
let selectedCells = [];
let totalScore = 0;
let maxScore = questions.length;

function createGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; // Clear any previous grid
    gridColors.forEach((color, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell", color);
        cell.textContent = index + 1;
        cell.addEventListener("click", () => handleCellClick(cell, index + 1));
        grid.appendChild(cell);
    });
}

function handleCellClick(cell, cellIndex) {
    if (selectedCells.includes(cellIndex)) {
        cell.classList.remove("selected");
        selectedCells = selectedCells.filter(c => c !== cellIndex);
    } else {
        cell.classList.add("selected");
        selectedCells.push(cellIndex);
    }
}

function loadQuestion() {
    const questionElement = document.getElementById("current-question");
    if (questionElement) {
        questionElement.textContent = questions[currentLevel];
    } else {
        console.error("Question element not found. Ensure your HTML has an element with id='current-question'.");
    }
}

function submitAnswer() {
    const correct = correctAnswers[currentLevel];
    const totalCorrect = correct.length;
    const selectedCorrect = selectedCells.filter(c => correct.includes(c)).length;
    const selectedIncorrect = selectedCells.filter(c => !correct.includes(c)).length;

    let scoreForThisQuestion = 0;

    if (selectedIncorrect > 0) {
        scoreForThisQuestion = 0; 
        alert(`You included wrong cells. No marks awarded for this question. `);
    } else if (selectedCorrect > 0) {
        scoreForThisQuestion = (selectedCorrect / totalCorrect).toFixed(2);
        alert(`You selected ${selectedCorrect}/${totalCorrect} correct cells. Marks awarded: ${scoreForThisQuestion*(45/maxScore)}`);
    } else {
        alert(`No correct cells selected. No marks awarded. `);
    }

    totalScore += parseFloat(scoreForThisQuestion);
    selectedCells = [];
    document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"));

    if (currentLevel < questions.length - 1) {
        currentLevel++;
        loadQuestion();
    } else {
        const finalPercentage = (((totalScore / maxScore) * 100).toFixed(2))*45/100;
        alert(`Game Over! Your final score is ${finalPercentage}.`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    loadQuestion();
    document.getElementById("submit-answer").addEventListener("click", submitAnswer);
});
