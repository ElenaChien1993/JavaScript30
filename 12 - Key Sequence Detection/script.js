const pressed = [];
const secretCode = '0711';

function check(e) {
  // console.log(e.key);
  pressed.push(e.key);
  // 如果不斷存取 e.key 會讓 pressed 陣列太長，所以只存取跟 secretCode 一樣長度即可
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  // console.log(pressed);
  // 轉為字串再進行比對
  if (pressed.join('').includes(secretCode)) {
    cornify_add();
  }
}

window.addEventListener('keyup', check);