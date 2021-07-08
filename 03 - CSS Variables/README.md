# Day 03 Playing with CSS Variables and JS

- 製作調整器可以調整 space / blur / color
    1. 製作 css 變數
    2. 使用 JS 在 css 變數上面

## CSS 變數

- 參考資料：[原生 CSS 變數運用技巧](https://w3c.hexschool.com/blog/21985acb)   /   [深入理解 CSS 變數](https://www.oxxostudio.tw/articles/202011/css-variables.html)

製作 CSS 變數有兩個步驟：

1. 定義變數：
CSS Variables 的變數定義必須定義在 CSS 選取器內，會建議定義在 `:root` 最高層級的選取器便於取用。
2. 取用變數值：
CSS Variables 在 **取值時** 才使用 `var (變數名稱)`。

```css
:root {
  --base: yellow;
  --spacing: 10px;
  --blur: 10px;
}

img {
  padding: var(--spacing);
  background: var(--base);
  filter: var(--blur);
}

.hl {
  color: var(--base);
}
```

💡 延伸閱讀：[CSS Media Queries 詳細介紹](https://www.oxxostudio.tw/articles/201810/css-media-queries.html)

## 用 Event Listener 連結

### 我的作法：

```jsx
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
```

### 老師的作法：

1. 把所有 input 一次取得，再使用 `forEach` 把 `eventListener` 加進去
2. event type 他使用 `change` 和 `mousemove` （我用 `input`）
3. 因為他把三個會變動的值寫在同一個 fn，所以把單位另外定義（因為有兩個值需要 px 單位）

```jsx
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
	const suffix = this.dataset.sizing || '';
	// 後面加了 or 表示若沒有這個 att 那就用空白取代
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
// 再加一個 mousemove 是因為 change 觸發的時機是 value 有被 commit 的時候

```

## 監聽事件的 event type

- [event 一覽表](https://developer.mozilla.org/en-US/docs/Web/Events)

### [`change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) vs [`input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)

> Note: 
The `input` event is fired every time the value of the element changes.<br>
This is unlike the `change` event, which only fires when the value is committed, <br>
such as by pressing the enter key, selecting a value from a list of options, and the like.

## HTML 複習

1. `<label>`
  閱讀資料：[HTML <label> 表單欄位標題](https://www.fooish.com/html/label-tag.html)

2. `<input>` 的 type 屬性
  閱讀資料：[HTML 表單元件 - <input> 標籤 (tag)](https://www.fooish.com/html/input-tag.html)
