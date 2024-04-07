function add(num1, num2) {
  return Number((num1 + num2).toFixed(8));
}

function subtract(num1, num2) {
  return Number((num1 - num2).toFixed(8));
}

function multiply(num1, num2) {
  return Number((num1 * num2).toFixed(7));
}

function divide(num1, num2) {
  if(num2 === 0) return 'ERROR!';
  let result = num1 / num2;
  return Number(result.toFixed(8));
}

function operate(firstNum, operator, secondNum) {
  let result;
  if (operator === '+') {
    result = add(+firstNum, +secondNum);
  } else if(operator === '-') {
    result = subtract(+firstNum, +secondNum);
  } else if(operator === '*') {
    result = multiply(+firstNum, +secondNum);
  } else if(operator === '/') {
    result = divide(+firstNum, +secondNum);
  }
  return result;
}

const numberBtns = document.querySelectorAll('.number-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const evalBtn = document.querySelector('.eval-btn');
const clearBtn = document.querySelector('#clear-btn');
const backspaceBtn = document.querySelector('#backspace-btn');
const display = document.querySelector('.display');
display.textContent = '0';

let displayValue = '';
let firstNum = '';
let secondNum = '';
let operator = '';

for (const btn of numberBtns) {
  btn.addEventListener('click', (e) => {
    if (!operator) {
      firstNum += e.target.textContent;
      displayValue = display.textContent = firstNum;
      console.log('The first number is ' + firstNum);
    } else if (operator && (firstNum || firstNum === 0)) {
      //The last conditon ensures the normal decimal check in case of firstNum equals to 0
      displayValue = display.textContent = '';
      secondNum += e.target.textContent;
      displayValue = display.textContent = secondNum;
      console.log('The second number is ' + secondNum);
    } 
    if (displayValue.split('').includes('.')) {
      document.getElementById('decimal').disabled = true;
      } else {
      document.getElementById('decimal').disabled = false;
    }
  });
}

for (const opBtn of operatorBtns) {
  opBtn.addEventListener('click', (e) => {
  if (!firstNum) {
    firstNum = displayValue;//This value came from the eval button pressed
    console.log('Now the first numbr is ' + firstNum);
  } else if (firstNum && operator && secondNum) {
    firstNum = evaluateFirstTwo(firstNum, operator, secondNum);
    console.log('The first value comes from the previous operation ' + firstNum);
  }
    operator = e.target.textContent;
    console.log('The current operator is ' + operator);
  });
}

function evaluateFirstTwo() {
  displayValue = display.textContent = '';
  displayValue = display.textContent = operate(firstNum, operator, secondNum);
  firstNum = '';
  secondNum = '';
  operator = '';
  return displayValue;
}

evalBtn.addEventListener('click', () => {
  if (!firstNum) {
    firstNum = '0';
  } else if(!secondNum) {
    secondNum = '0';
  } else if (!operator) {
    displayValue = display.textContent = '0';
  }

  displayValue = display.textContent = operate(firstNum, operator,secondNum);
  console.log('The result is ' + displayValue);
  
  firstNum = '';
  secondNum = '';
  operator = '';
});

clearBtn.addEventListener('click', reset);
function reset() {
  if(displayValue ||firstNum ||secondNum ||operator) {
    firstNum = '';
    secondNum = '';
    operator = '';
    displayValue = display.textContent = '0';
  }
}

backspaceBtn.addEventListener('click', () => {
  let arr = displayValue.split('');
  arr.pop();

  if(firstNum && !secondNum && !operator) {
    firstNum = displayValue = display.textContent = arr.join('');
    console.log('WOW the first numbr goes back to ' + firstNum);
  }

  if(firstNum && operator) {
    secondNum = displayValue = display.textContent = arr.join('');
    console.log('WOW the second numbr goes back to ' + secondNum);
  }  
});