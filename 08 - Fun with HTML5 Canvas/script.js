const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
// lineJoin 決定兩條線交會的形式：miter 尖角 / bevel 斜角 / round 圓角
ctx.lineCap = "round";
// lineCap 決定線條畫筆形狀：butt 平面 / round 圓角
ctx.lineWidth = 30;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
  if (!isDrawing) return; 
  // 如果不是 mousedown 就停止並跳出這個 fn 
  // console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  
  hue ++;
  if (hue >= 360){
    hue = 0;
  }
  
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
  }
  
  if (direction){
    ctx.lineWidth ++;
  }else {
    ctx.lineWidth --;
  }
  
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // 在開始畫之前，先更新座標位置
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
// 當滑鼠按住然後移出視窗，再移回來的話系統還是會認定他是 mousedown


