# Day 02 CSS + JS Clock
* 讓時針、分針、秒針跟著實際的時間運行移動
  1. 讓三個針都使用 transform & transition
  2. `setInterval` 套用到實際時間軸上
## CSS Transform 複習
* 參考資料：[變形 (transform) 2D 基本使用](https://eyesofkids.gitbooks.io/css3/content/contents/transform2d.html)
#### 1. `transform: scale(2, 0.5);`  縮放大小比例
根據提供的數字值進行放大或縮小，有三種寫法：
```css
transform: scale(2, 0.5); /* 只提供一個數字時 X 軸與 Y 軸使用相同的比例 */
transform: scaleX(2);
transform: scaleY(0.5);
```
#### 2. `transform: rotate(30deg);`  旋轉
正數順時針轉，負數逆時針轉，超過 360 度代表轉過一圈再繼續旋轉 <br>
一樣可以只針對 x / y / z 軸進行旋轉
```css
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
```
#### 3. `transform: translate(12px, 50%);`  平移
進行 X 軸或 Y 軸的移動，也就是左/右、上/下的移動。<br>
數值可以使用 CSS 中的正負長度數值 (px, em, in)，或是百分比
```css
transform: translateX(2em);
transform: translateY(3in);
transform: translateZ(2px);
```
#### 4. `transform: skew(30deg, 20deg);`  傾斜
X 軸或 Y 軸以某個角度進行傾斜
```css
transform: skewX(30deg);
transform: skewY(1.07rad);
```
💡註：如果想要一次做多種 transform 可以寫在一起
```css
transform: rotate(45deg) translateX(200px);
```
#### 5. 變形原點 (transform-origin)
* 延伸閱讀：[CSS-Tricks](https://css-tricks.com/almanac/properties/t/transform-origin/)
default 值都是元素的正中心點（50% 50%）<br>
數值可以使用長度、百分比、和 top, left, right, bottom, center 關鍵字
```css
transform-origin: top left;
```
## CSS transition 複習
* 參考資料：[CSS3 轉場效果 (transitions)](https://eyesofkids.gitbooks.io/css3/content/contents/transitions.html) /  [CSS-TRICKS](https://css-tricks.com/almanac/properties/t/transition/)
可放四個參數值
```css
.example {
    transition: [property] [duration] [timing-function] [delay];
}
```
* **transition-property：** 定義哪些 CSS 屬性會被這個轉場效果影響，預設值為 `all`<br>
如果這個屬性定義為 `transform`，代表所有是 transform 的屬性都會被偵測來進行動畫。<br>
如果這個屬性定義為 `all`，就會自動偵測所有可進行動畫的屬性，包含 `transform` 屬性。
* **transition-duration：** 定義轉場的持續時間，預設值是 `0s`<br>
時間通常以 s 為單位(秒)，可以定義小數點例如 `0.5s` 或 `.5s`
* **transition-timing-function：** 用來設定轉場過程時所使用的貝茲曲線，預設值是 `ease`<br>
內建的幾個可直接使用數值如下，在[這個頁面](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)中可看所有的預設值移動範例：
    - ease
    - linear
    - ease-in
    - ease-out
    - ease-in-out
    - step-start
    - step-end
    - steps()
    - cubic-bezier()

    其中 `cubic-bezier()` 的數值，可以到 [cubic-bezier.com](http://cubic-bezier.com/) 來自訂所需要的貝茲曲線參數值，<br>
    或是到這一頁 [Easing函數](http://easings.net/zh-tw) 或 [CSS EASING ANIMATION TOOL](https://matthewlein.com/ceaser/) 裡面挑選想要的 Easing 函數。
* **transition-delay：** 定義多久之後開始發生轉場，預設值是 `0s`<br>

## JS 定時器：setTimeout / setInterval 
參考資料：[Scheduling: setTimeout and setInterval](https://javascript.info/settimeout-setinterval)

* `setTimeout` allows us to run a function once after the interval of time.
* `setInterval` allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.

這次的時鐘是使用重複的 `setInterval`  語法：

```jsx
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
let intervalID = setInterval(func, delay);
```

參數 `delay` 表示要等候多久，單位是毫秒 (milliseconds)

## 自己做遇到的問題

- 要怎麼取得現在的時間？

    答：使用 `new Date()` ，會產生當下的本地時間

    - 延伸閱讀：[日期/時間物件](https://javascript.info/date) / [JavaScript Date 時間和日期](https://www.fooish.com/javascript/date/)

    【產生時間物件】

    `new Date()` ：無參數會產生當下的**本地時間**物件

    `new Date(milliseconds)`：參數為特定 Timestamp 的毫秒數，可產生該時間的 date 物件

    【取得時間物件】

    `getFullYear()`：拿到年份（四位數）

    `getMonth()`：拿到月份，0-11 的數字（0 = 1月；11 = 12月）

    `getDate()`：拿到日期，1-31 的數字

    `getDay()`：拿到星期，0-6 的數字（0 = 星期天：6 = 星期六）

    `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`

    `getTime()`：拿到 timestamp 

    ```jsx
    // current date
    let date = new Date();

    // the hour in your current time zone
    alert( date.getHours() );

    // the hour in UTC+0 time zone (London time without daylight savings)
    alert( date.getUTCHours() );
    ```

- 要怎麼讓 css 的 transform 同步現在的時間進行？

    先拆解成以下步驟：

    1. 讓秒數跟旋轉的度數同步成為同個單位的值（因為一個是 60 秒，一個是 360 度ㄋ）
    2. 將秒針的 style.transform 定義進去 setInterval 的 fn 當中
    3. 分針和時針也採取相同方式進行

    ---

    ### 1. 將秒數和旋轉度數的單位同步

    （一些數學知識的部分）

    ```jsx
    const now = new Date();
      
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    // 因為 CSS 上我們有預設是從 90 度開始，要加上 90 度，顯示的位置才會跟真實秒數同步
    ```

    ### 2. 讓秒針動起來！

    修改該元素的 `style.transform` 中的 `rotate` 

    ```jsx
    const secondHand = document.querySelector(".second-hand");

    function setDate (){
      const now = new Date();
      
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    }

    setInterval(setDate, 1000); // 1000毫秒 = 1秒
    ```

    ### 3. 把分針和時針也用相同方式寫進去

    ```jsx
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
    ```

