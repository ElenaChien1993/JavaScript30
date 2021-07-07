const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate (){
  const now = new Date();
  
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  // 因為 CSS 上預設是從 90 度開始，要加上 90 度，顯示的位置才會跟真實秒數同步
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  
  const minutes = now.getMinutes();
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  minHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;  
}

setInterval(setDate, 1000); // 1000毫秒 = 1秒