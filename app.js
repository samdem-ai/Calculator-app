const keys = document.querySelector(".keypad");
const toggle = document.querySelector(".circle");
const toggler = document.querySelector(".toggler");
const theme = document.querySelector(".theme");
const screen = document.querySelector(".res");
let state = 1;

for (const button of keys.childNodes) {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "1":
        addToScreen("1");
        break;
      case "2":
        addToScreen("2");
        break;
      case "3":
        addToScreen("3");
        break;
      case "4":
        addToScreen("4");
        break;
      case "5":
        addToScreen("5");
        break;
      case "6":
        addToScreen("6");
        break;
      case "7":
        addToScreen("7");
        break;
      case "8":
        addToScreen("8");
        break;
      case "9":
        addToScreen("9");
        break;
      case "0":
        addToScreen("0");
        break;
      case "+":
        doOperation("+");
        addOp("+");
        break;
      case "-":
        doOperation("-");
        addOp("-");
        break;
      case "x":
        doOperation("x");
        addOp("x");
        break;
      case "/":
        doOperation("/");
        addOp("/");
        break;
      case ".":
        addOp(".");
        break;
      case "Del":
        if (screen.innerText.length === 1 || !parseInt(screen.innerText)) {
          screen.innerText = "0";
        } else {
          screen.innerText = screen.innerText.slice(0, -1);
        }
        break;
      case "RESET":
        screen.innerText = "0";
        break;
      case "EQ":
        doOperation("");
        break;
      default:
        break;
    }
    toggleButton(button);
  });
}

//change theme here
toggler.addEventListener("click", () => {
  if (state === 1) {
    toggle.classList.remove("returnTo1");
    toggle.classList.add("addTo2");
    theme.href = "styles/theme2.css";
    state += 1;
  } else if (state === 2) {
    toggle.classList.remove("addTo2");
    toggle.classList.add("addTo3");
    state += 1;
    theme.href = "styles/theme3.css";
  } else if (state === 3) {
    toggle.classList.remove("addTo2");
    toggle.classList.remove("addTo3");
    toggle.classList.add("returnTo1");
    theme.href = "styles/theme1.css";
    state = 1;
  }
});

//to make the button get pressed "style"
function toggleButton(button) {
  button.classList.add("rm");
  setTimeout(() => {
    button.classList.remove("rm");
  }, 100);
}

//add numbers to screen
function addToScreen(num) {
  if (screen.innerText === "0") {
    screen.innerText = num;
  } else {
    screen.innerText += num;
  }
}

let operations = ["+", "-", "/", "x"];

//add operation to screen
function addOp(op) {
  if (
    op === "." &&
    !operations.some((ops) => screen.innerText.includes(ops)) &&
    !screen.innerText.includes(".")
  ) {
    screen.innerText += op;
  } else if (op === "." && screen.innerText.includes(".")) {
    if (
      operations.some((ops) => screen.innerText.includes(ops)) &&
      !screen.innerText.slice(pos(screen.innerText, operations)).includes(".")
    ) {
      screen.innerText += op;
    }
  } else if (
    operations.every((ops) => screen.innerText.slice(-1) !== ops) &&
    screen.innerText !== "0"
  ) {
    screen.innerText += op;
  }
}

//get position of operations
function pos(text, operations) {
  let i;
  for (const op of operations) {
    if (text.indexOf(op) !== -1) {
      i = text.indexOf(op);
    }
  }
  return i;
}

function doOperation(op) {
  const opPos = pos(screen.innerText, operations);
  const operation = screen.innerText[opPos];
  let res;
  if (
    operations.some((ops) => screen.innerText.includes(ops)) &&
    screen.innerText[opPos + 1]
    && parseInt(screen.innerText)
  ) {
    let numbers = screen.innerText.split(operation);
    switch (operation) {
      case "+":
        res = parseFloat(numbers[0]) + parseFloat(numbers[1]);
        screen.innerText = roundNum(res)
        break;
      case "-":
        res = parseFloat(numbers[0]) - parseFloat(numbers[1]);
        screen.innerText = roundNum(res)
        break;
      case "x":
        res = parseFloat(numbers[0]) * parseFloat(numbers[1]);
        screen.innerText = roundNum(res)
        break;
      case "/":
        res = parseFloat(numbers[0]) / parseFloat(numbers[1]);
        if (res == Infinity){
            screen.innerText = 'D/0'
        }else{
            screen.innerText = roundNum(res)
        }
        
        break;

      default:
        break;
    }
  }else if(!parseInt(screen.innerText)){
    screen.innerText = '0'
  }
}

function roundNum(r){
    if (Number.isInteger(r)){
        return parseInt(r)
    }
    else{
        let afterDec = r.toString().slice(r.toString().indexOf('.')+1)
        if (afterDec.length>=13) {
            return r.toFixed(12)
        }else{
            return r
        }
    }
}
