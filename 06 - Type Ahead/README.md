# Day 06 Ajax Type Ahead

- 建立搜尋關鍵字，在頁面上顯示相關資料
    1. 先用 fetch 取得資料
    2. 用正規表達式篩選資料
    3. 建立 event lisener 顯示資料

## 什麼是 Ajax？

> AJAX 即「Asynchronous JavaScript and XML」（非同步的 JavaScript 與 XML 技術），指的是一套綜合了多項技術的瀏覽器端網頁開發技術。

- [參考資料](https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX/Getting_Started)

AJAX 使用 XMLHttpRequest 物件來與伺服器進行通訊。
它可以傳送並接收多種格式的資訊，包括 JSON、XML、HTML、以及文字檔案。
AJAX 最吸引人的特點是「非同步」的本質，這代表它可以與伺服溝通、交換資料、以及更新頁面，且無須重整網頁。

- [Day21 AJAX(1): 科普 & XHR](https://ithelp.ithome.com.tw/articles/10203820)

[0712 Udemy HTTP / JSON / AJAX](https://www.notion.so/0712-Udemy-HTTP-JSON-AJAX-78e2dd3c1e504de3bd51c538b88f27c3) 

---

## 實作步驟

1. 先用 fetch 取得資料

    ```jsx
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    // 先取得資料，然後把資料放進新建的陣列中
    const cities = [];
    fetch(endpoint)
      .then(response => response.json())
      .then(data => cities.push(...data));
    // 直接用 .push 的話，會變成陣列包陣列 [[]]
    // 所以前面加 ... 把 data 分散進去已建好的空陣列中
    ```

2. 用正規表達式篩選資料

    ```jsx
    // 用 regex 做 match fn
    function findMatches(wordToMatch, cities){
      return cities.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
      })
    }
    ```

    ### 正規表達式 Regular Expression

    參考資料：[初探 Regex 正規表達式](https://moojing.medium.com/javascript-%E5%88%9D%E6%8E%A2regex-%E6%AD%A3%E8%A6%8F%E8%A1%A8%E9%81%94%E5%BC%8F-1da2f4d94795)、[來寫正規表達式 Regex](https://medium.com/itsems-frontend/whats-regex-dc08c8c30a87)、[Regular expressions](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)

    Regex 是用來處理字串的方法，用自己一套特殊的符號表示法，
    讓我們可以很方便的搜尋字串、取代字串、刪除字串或測試字串是否符合樣式規則。

    - 宣告 RegExp 物件

        (a) literal notation 

        ```jsx
        // 用兩個斜線來包住正規表示式
        const pattern = /pattern/flags;

        // 範例
        const re = /ab+c/gi;
        // g = global ； i = ignoreCase
        ```

        (b) new RegExp  (constructor)

        ```jsx
        const pattern = new RegExp(pattern, flags);

        // 範例
        const re = new RegExp('ab+c', 'gi');
        // g = global ； i = ignoreCase

        // 以下三個為相同意思
        /ab+c/i
        new RegExp(/ab+c/, 'i') // literal notation
        new RegExp('ab+c', 'i') // constructor
        ```

    💡 有一些常用的特殊規則，要用的時候可以查詢上面的參考資料

3. 製作頁面 display 的 fn

    ```jsx
    // 做 display 的 fn
    // 先取得頁面上會使用到的 DOM 元素
    const searchInput = document.querySelector(".search");
    const suggestions = document.querySelector(".suggestions");

    // (1) 透過 input 輸入的 value 抓取篩選後的遠端資料
    // (2) 將符合條件的遠端資料按照希望格式顯示在頁面上的期望位置
    function displayMatches(){
      // console.log(this.value)
      const matchArray = findMatches(this.value, cities);
      // console.log(matchArray)
      // 下面用 innerHTML 的方式直接用 JS 新增 html 格式
      const html = matchArray.map(place => {
        return `
          <li>
            <span class="name">${place.city}, ${place.state}</span>
            <span class="population">${place.population}</span>
          </li>
        `;
      }).join(""); // 因為 map 回傳的是 array，用 join 把它變成一串字串
      // console.log(html);
      suggestions.innerHTML = html;
    }

    searchInput.addEventListener("change", displayMatches);
    // change 事件觸發的時機點是：當改變「完成」後，所以加一個 keyup 事件確保每次輸入都觸發
    searchInput.addEventListener("keyup", displayMatches);
    ```

4. 將數字加上逗點格式 & highlight 搜尋字

    結合在上面的 map 中

    ```jsx
    // 數字加逗號 fn >> 網路上找別人寫好的 code
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function displayMatches(){
      // console.log(this.value)
      const matchArray = findMatches(this.value, cities);
      // console.log(matchArray)
      const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
    		// 用 replace 把黃底的 class 取代原本的 html
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
          <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
          </li>
        `;
      }).join(""); // 因為 map 回傳的是 array，用 join 把它變成一串字串
      // console.log(html);
      suggestions.innerHTML = html;
    } 
    ```
