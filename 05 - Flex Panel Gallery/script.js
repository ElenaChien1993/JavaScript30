console.clear();
const panel = document.querySelectorAll(".panel");

function open(){
  // console.log(this);
  this.classList.toggle("open");
}
function active(e){
  // console.log(e.propertyName)
  if (e.propertyName === "flex-grow"){
    this.classList.toggle("open-active");
  }
}

panel.forEach(item => {
  item.addEventListener("click", open);
})
panel.forEach(item => {
  item.addEventListener("transitionend", active);
})