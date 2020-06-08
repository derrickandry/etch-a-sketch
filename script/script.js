const container = document.querySelector(".gridContainer");

let height = window.outerHeight;
let width = window.outerWidth;

let row = 16;
let column = 22;

let containerWidth = 685;
let containerHeight = 485;

let resetButton = document.getElementById("reset");
let rainbowButton = document.getElementById("rainbow");
let blackButton = document.getElementById("black");
let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");

let colortype = 0; //black = 0, random = 1

function makeGrid(row, column) {
  container.innerHTML = "";
  for (i = 0; i < row * column; i++) {
    let grid = document.createElement("div");
    container.appendChild(grid).className = "grid";
    grid.style.width = containerWidth / column + "px";
    grid.style.height = containerHeight / row + "px";
  }
  if (colortype) {
    setColorRainbow();
  } else setColorBlack();
}

function changeColorRainbow() {
  let letter = "ABCDEF0123456789";
  let color = "#";
  for (i = 0; i < 6; i++) {
    color += letter[Math.floor(Math.random() * 11)];
  }
  this.style.background = color;
}

function setColorRainbow() {
  blackButton.style.background = "darkgrey";
  let grids = document.querySelectorAll(".grid");
  for (i = 0; i < row * column; i++) {
    grids[i].removeEventListener("mouseover", changeColorBlack);
    grids[i].addEventListener("mouseover", changeColorRainbow);
  }
  this.style.background = "grey";
  colortype = 1;
}

function changeColorBlack() {
  this.style.background = "grey";
}

function setColorBlack() {
  rainbowButton.style.background = "darkgrey";
  let grids = document.querySelectorAll(".grid");
  for (i = 0; i < row * column; i++) {
    grids[i].removeEventListener("mouseover", changeColorRainbow);
    grids[i].addEventListener("mouseover", changeColorBlack);
  }

  colortype = 0;
}

function reset() {
  let grids = document.querySelectorAll(".grid");
  for (var i = 0; i < grids.length; i++) {
    grids[i].style.background = "rgb(229, 238, 229)";
  }
}

function updateRes() {
  row = widthInput.value;
  heightInput.value = Math.floor(row * 1.31);
  column = heightInput.value;
  container.style.gridTemplateColumns = "repeat(" + column + ", 1fr)";
  container.style.gridTemplateRows = "repeat(" + row + ", 1fr)";
  makeGrid(row, column);
  console.log(row, column);
}
resetButton.addEventListener("click", reset);
rainbowButton.addEventListener("click", setColorRainbow);
blackButton.addEventListener("click", setColorBlack);
widthInput.addEventListener("change", updateRes);
makeGrid(row, column, colortype);
setColorBlack();
