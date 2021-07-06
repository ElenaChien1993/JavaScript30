function playSound (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // console.log(audio)
    if (!audio) return; // 停止這個 fn 
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing")
}
function removeTransition (e){
    // console.log(e);
    // log 參數出來會發現有很多個 transition Event（外框變顏色 & 變大 & 加陰影）
    if (e.propertyName !== "transform") return; // 如果不是 transform 這個最久的動畫，就略過這個 fn
    // 因為我們是希望當動畫結束時，移除 playing 這個 class，所以要選一個動畫時間最長的，確保整套動畫有完全走完
    // console.log(this); // 看看這邊的 this 是什麼
    this.classList.remove("playing");
}

window.addEventListener("keydown", playSound)
const keys = document.querySelectorAll(".key");
// 因為 keys 是所有按鍵的 NodeList，要將每個按鍵都加上 event listener 用 forEach
keys.forEach(key => key.addEventListener("transitionend", removeTransition));