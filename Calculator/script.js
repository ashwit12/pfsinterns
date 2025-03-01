let currentInput = "";

function clearScreen() {
    currentInput = "";
    document.getElementById("screen").value = "0";
}

function appendNumber(number) {
    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateScreen();
}

function appendOperator(operator) {
    if (currentInput === "" || isNaN(currentInput[currentInput.length - 1])) {
        return;
    }
    currentInput += operator;
    updateScreen();
}

function appendDecimal() {
    let parts = currentInput.split(/[\+\-\*\/]/);
    if (parts[parts.length - 1].includes(".")) {
        return;
    }
    currentInput += ".";
    updateScreen();
}

function updateScreen() {
    document.getElementById("screen").value = currentInput;
}

function calculateResult() {
    const screen = document.getElementById("screen");
    try {
        screen.value = eval(currentInput);
        currentInput = screen.value;
        if (screen.value === "Infinity" || screen.value === "NaN") {
            screen.value = "Error";
            screen.classList.add("error");
        } else {
            screen.classList.remove("error");
        }
    } catch (e) {
        screen.value = "Error";
        screen.classList.add("error");
    }
}
