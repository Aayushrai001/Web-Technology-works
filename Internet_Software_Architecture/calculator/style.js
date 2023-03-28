const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.textContent;
    if (buttonValue === "AC") {
      clear();
    } else if (buttonValue === "+/-") {
      negate();
    } else if (buttonValue === "%") {
      percent();
    } else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "x" || buttonValue === "÷") {
      operator = buttonValue;
      firstOperand = parseFloat(screen.textContent);
      screen.textContent = "";
    } else if (buttonValue === "=") {
      secondOperand = parseFloat(screen.textContent);
      calculate();
      operator = null;
    } else if (buttonValue === ".") {
      if (!screen.textContent.includes(".")) {
        screen.textContent += buttonValue;
      }
    } else {
      screen.textContent += buttonValue;
    }
  });
});

function clear() {
  screen.textContent = "";
  firstOperand = null;
  secondOperand = null;
  operator = null;
}

function negate() {
  screen.textContent = parseFloat(screen.textContent) * -1;
}

function percent() {
  screen.textContent = parseFloat(screen.textContent) / 100;
}

function calculate() {
  if (operator === "+") {
    result = firstOperand + secondOperand;
  } else if (operator === "-") {
    result = firstOperand - secondOperand;
  } else if (operator === "x") {
    result = firstOperand * secondOperand;
  } else if (operator === "÷") {
    result = firstOperand / secondOperand;
  }
  screen.textContent = result;
}
