# Day 10 Hold Shift to Check Multiple Checkboxes

[Courses Dashboard | Wes Bos](https://courses.wesbos.com/account/access/60e2872fb36fe451adb83f81/view/194129765)

### 目標

當選取一個 checkbox 後，按住 shift ，再選取另一個 checkbox ，
這兩個 checkbox 中間的所有 checkbox 會自動都被選取。

### 執行步驟

1. 存取 DOM 上面的 input 元素
2. 因為有很多個 input 元素，所以用 `forEach` 都加上 event listener
3. 製作 handleCheck fn
    1. 製作 inBetween 作為選取區間的標記（true / false）
    最一開始為 false，當此 checkbox 屬於區間內的話，則改為 true（相反狀態）
    2. 檢查有無按住 shift 鍵 & 點擊當下是 checking 狀態（非 unchecking）
    3. 若上述皆為 true，則 `forEach` 跑過所有 checkbox 檢查是否符合區間，
    並用 inBetween 做區間標記，把符合的 checkbox 勾選起來

### JS code

```jsx
// 存取 DOM 上面的 input 元素
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

// 為了要獲得第一次點擊和第二次點擊之間的區間，必須記錄 lastChecked（上一次點擊） 的位置
let lastChecked;

function handleCheck(e) {
    // console.log(e);
    // 檢查有無按住 shift 鍵 & 點擊當下是 checking 狀態（非 unchecking）
    let inBetween = false;
    if (e.shiftKey && this.checked) {
        checkboxes.forEach(checkbox => {
            console.log(checkbox);
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
                console.log("Starting to check them inbetween!");
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }

    // 如果 click 事件觸發但沒有進入上面的 if 條件，就記錄此次的 click 位置為 lastChecked（上一次點擊
    // 而做完 if 條件後的第二次點擊，在跳出 fn 的最後也會被更新成為 lastChecked（上一次點擊
    lastChecked = this;
}

// 用 forEach 把 input 都加上 event listener
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```
