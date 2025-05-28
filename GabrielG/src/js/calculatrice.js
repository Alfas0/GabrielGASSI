const display = document.getElementById('display');
const buttons = document.querySelectorAll('button[data-value]');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

function appendValue(val) {
  if (display.value === "" && val !== "." || display.value == "Erreur") {
    display.value = val;
  } else {
    display.value += val;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    appendValue(button.getAttribute('data-value'));
  });
});

clearBtn.addEventListener('click', () => {
  display.value = "";
});

equalsBtn.addEventListener('click', () => {
  calculate();
});

function calculate() {
  try {
    let expr = display.value
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/mod/g, '%');

    let result = Function('"use strict";return (' + expr + ')')();
    display.value = result;
  } catch {
    display.value = "Erreur";
  }
}

window.addEventListener('keydown', (e) => {
  const allowedKeys = ['+', '-', '*', '/', '.', '%', '(', ')'];

  if ((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key)) {
    e.preventDefault();
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    display.value = display.value.slice(0, -1);
  } else if (e.key.toLowerCase() === 'c') {
    e.preventDefault();
    display.value = "";
  }
});

