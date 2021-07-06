# Day 01 Drum Kit
* 點擊鍵盤上相對應按鈕，觸發兩件事情：
  1. add class 變大 & 出現黃框框
  2. 播放相對應的 audio

### 自己做遇到的問題
#### 1. 怎麼 access html 中他自訂的標籤 `data-key="65"` ？以及如何加入 event listener 中？ <br>
`data-` 這個是讓人自訂標籤的一個標準用法，可以加在 html 標籤後面 >> [延伸閱讀1](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) & [2](https://ithelp.ithome.com.tw/articles/10221029).  
  > attribute `data-test-value`  will be accessible via `HTMLElement.dataset.testValue` (or by `HTMLElement.dataset["testValue"]`)   
  ```JavaScript
window.addEventListener("keydown", function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log(audio) // <audio data-key="65" src="sounds/clap.wav"></audio>
})
  ```
上面有兩件事情我不清楚 🥲   
* A) 為什麼要使用 「``」 包起來 <br>
答：這是 ES6 的 **模版字符串（template literal）** >> [延伸閱讀](https://pjchender.blogspot.com/2017/01/javascript-es6-template-literalstagged.html) <br>
因為這邊的字串中需要包含變數

* B) `audio[data-key="${e.keyCode}"]`  這個怎麼來的？ <br>
答：這是 [CSS 的 attribute selector](https://titangene.github.io/article/css-attribute-selector.html) 語法 >> `element[att="value"]`

#### 2. 如何在 JS 中播放音檔？ <br>
參考資料：[JavaScript audio play 播放音效](https://shengyu7697.github.io/js-audio/) <br>
```JavaScript
window.addEventListener("keydown", function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // console.log(audio)
    if (!audio) return; // 如果沒有這個 audio 就停止這個 fn 
    audio.play();
})
```
但這樣會發生一件事，雖然按對應的按鍵有聲音，無法一按就有，要等前一次的 click 事件音檔播放完他才會再播一次，<br>
所以要新增一個指令是：**每次 keypress 都將音檔秒數歸零**
```JavaScript
window.addEventListener("keydown", function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // console.log(audio)
    if (!audio) return; // 停止這個 fn 
    audio.currentTime = 0;
    audio.play();
})
```
#### 3.怎麼讓 playing 的 class 按一下就消失？
我自己第一想法是使用 event 的 `keyup` 去做 class remove <br>
```JavaScript
window.addEventListener("keyup", function(e){
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.remove("playing")
})
```
但如果 transition 秒數比較久的話！就會讓動畫都還沒開始就 (keyup) 結束了 <br>
所以老師使用 `transitionend` event 去做 >> [延伸閱讀](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)<br>
  
`transitionend` event 會在每次 CSS transition 完成後被觸發<br>
所以用 event listener 針對 `transitionend` 發生後，將 playing 的 class remove
```JavaScript
function removeTransition (e){
    // console.log(e);
    // log 參數出來會發現有很多個 transition Event（外框變顏色 & 變大 & 加陰影）
    if (e.propertyName !== "transform") return; // 如果不是 transform 這個最久的動畫，就略過這個 fn
    // 因為我們是希望當動畫結束時，移除 playing 這個 class，所以要選一個動畫時間最長的，確保整套動畫有完全走完
    // console.log(this); // 看看這邊的 this 是什麼
    this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
// 因為 keys 是所有按鍵的 NodeList，要將每個按鍵都加上 event listener 用 forEach
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
```
