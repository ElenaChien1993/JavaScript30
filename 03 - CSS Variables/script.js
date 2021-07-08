const color = document.getElementById("base");
const space = document.getElementById("spacing");
const blurLevel = document.getElementById("blur");
const root = document.documentElement

function changeColor(){
  root.style.setProperty("--base", `${color.value}`);
}

function changeSpace(){
  root.style.setProperty("--spacing", `${space.value}px`);
}

function changeBlur(){
  root.style.setProperty("--blur", `${blurLevel.value}px`);
}

color.addEventListener("input", changeColor);
space.addEventListener("input", changeSpace);
blurLevel.addEventListener("input", changeBlur);
