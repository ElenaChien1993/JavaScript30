const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// 先取得資料，然後把資料放進新建的陣列中
const cities = [];
fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));
// 直接用 .push 的話，會變成陣列包陣列 [[]]
// 所以前面加 ... 把 data 分散進去已建好的空陣列中

// 用 regex 做 match fn
function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  })
}

// 做 display 的 fn
// 先取得頁面上會使用到的 DOM 元素
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// 網路上找別人寫好的 code
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// (1) 透過 input 輸入的 value 抓取篩選後的遠端資料
// (2) 將符合條件的遠端資料按照希望格式顯示在頁面上的期望位置
function displayMatches(){
  // console.log(this.value)
  const matchArray = findMatches(this.value, cities);
  // console.log(matchArray)
  // 下面用 innerHTML 的方式直接用 JS 新增 html 格式
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, "gi");
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

searchInput.addEventListener("change", displayMatches);
// change 事件觸發的時機點是：當改變「完成」後，所以加一個 keyup 事件確保每次輸入都觸發
searchInput.addEventListener("keyup", displayMatches);