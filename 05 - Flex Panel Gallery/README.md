# Day 05 Flex Panels Image Gallery

- 用 CSS 做出漂亮的 Gallery

## 老師初版 CSS 我看不懂的語法

1.  
```css
*, *:before, *:after {
  box-sizing: inherit;
} 
```
    
💡 `*` 代表所有 element <br>
💡 `:before` 代表在這個元素前面 <br>
💡 `:after` 代表在這個元素後面 <br>

2.  

```css
.panels {
  min-height: 100vh;
  overflow: hidden;
}
```
💡 `overflow` 控制那些超出範圍的內容該怎麼樣  <br>
    `overflow: hidden` 就是把超出範圍的內容隱藏

3.  
```css
.panel p:nth-child(2) {  /* 選取 panel class 裡面第二個 <p> 元素 */
  font-size: 4em;
}
```
💡 參考閱讀：[使用 CSS3 `:nth-child(n)` 選取器教學](http://csscoke.com/2013/09/21/%E4%BD%BF%E7%94%A8css3-nth-childn-%E9%81%B8%E5%8F%96%E5%99%A8%E8%A9%B3%E8%A7%A3/)

`:nth-child(odd)` ：取得「奇數」位數的元素（第 1、3、5...個） <br>
`:nth-child(even)` ：取得「偶數」位數的元素（第 2、4、6...個） <br>
也可以如上面的範例直接寫數字，也可寫算式（詳情看參考閱讀）

## 執行步驟

1. 先將整個大區塊 div 變成 flexbox(1)（做編號只是因為等等會有其他 flexbox）

    ```css
    .panels {
    	min-height: 100vh;
    	overflow: hidden;
    	display: flex;
    }
    ```

2. 把大區塊 flexbox(1) 內的 items 等比分配佔比

    ```css
    .panel {
    	flex: 1;
    }
    ```

3. 讓小區塊 panel 中的文字置中後，垂直分佈各佔三等份  <br>
所以要讓 panel 自己也成為一個 flexbox(2)，讓裡面的文字元素成為 flexbox(2) 的 items <br>
為了讓文字在自己的區塊內也都置中，所以要讓文字們也都成為 flexbox(3)

    ```css
    .panel {
    	flex: 1;
    	display: flex;
    	flex-direction: column;  /* flexbox 預設為水平排列，所以把它轉成垂直 */
    	justify-content: center;
    	align-items: center;
    }

    .panel > * {   /* 代表 取得 parent 是 panel class 的所有子元素 */
      margin: 0;
      width: 100%;
      transition: transform 0.5s;
      flex: 1 0 auto;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    ```

4. 把第一行和最後一行文字用 transfrom 藏在視窗外面（為了做動畫讓他飛進來）

    ```css
    .panel > *:first-child {
      transform: translateY(-100%);
    }
    .panel.open-active > *:first-child {
      transform: translateY(0%);
    }
    /* 先加一個讓他回原位的 class，JS 寫 event 時候用  */

    .panel > *:last-child {
      transform: translateY(100%);
    }
    .panel.open-active > *:last-child {
      transform: translateY(0%);
    }
    ```

5. 開始用 JS 加上 event listener

    自己嘗試的時候沒想到 (a.) 善用 `this` (b.) 字飛進來應該是要等放大後

    ```jsx
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

    panel.forEach((item) => {
      item.addEventListener("click", open);
    })
    panel.forEach((item) => {
      item.addEventListener("transitionend", active);
    }
    ```
