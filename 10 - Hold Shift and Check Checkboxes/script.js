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