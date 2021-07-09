# Day 04 Array Cardio Part1
- [codepen](https://codepen.io/elenachien/pen/OJmXLPQ)
- 用幾個小題目練習 array method

### 1. Filter the list of inventors for those who were born in the 1500's

我的答案：

```jsx
const fifteen = inventors.filter(user => user.year > 1500 && user.year < 1600);
```

但應該把運算式加上等於會比較保險

```jsx
const fifteen = inventors.filter(user => user.year >= 1500 && user.year < 1600);
```

### 2. Give us an array of the inventors first and last names

我的答案：

```jsx
const names = inventors.map(users => (users.first + " " + users.last));
```

可以用 `` 包起來

```jsx
const names = inventors.map(users => `${users.first} ${users.last}`);
```

### 3. Sort the inventors by birthdate, oldest to youngest

我的答案：

```jsx
const sorted = inventors.sort((a, b) =>  a.year - b.year);
```

### 4. How many years did all the inventors live all together?

我的答案：

```jsx
const total = inventors.reduce((acc, cur) => {
  acc += (cur.passed - cur.year);
  return acc;
}, 0)

console.log(total); // 861
```

### 5. Sort the inventors by years lived

我的答案：

```jsx
const sortedLife = inventors.sort((a, b) => {
  const firstPp = a.passed - a.year;
  const secPp = b.passed - b.year;
  return secPp - firstPp;
})
```

## 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name

我的答案：

（一開始我其實看不懂題目，原來是要點進那個網址去操作裡面的 DOM XD）

```jsx
const category = document.querySelector(".mw-category");
const links = category.querySelectorAll("a"); // 也可以用 selector 選定義好的變數

const de = links.map(list => list.textContent);
// 會出現 error! 因為 links 他不是 array，無法使用 map method
```

轉為陣列有兩種方式：

1. Array.from(要變成陣列的東西)
2. [...要變成陣列的東西]

```jsx
const category = document.querySelector(".mw-category");
const links = Array.from(category.querySelectorAll("a"));

const de = links
  .map(list => list.textContent) // 先回傳他的 text 內容
  .filter(name => name.includes("de")); // 再篩選內容有包含 de 的
```

### 7. Sort the people alphabetically by last name

我的答案：

```jsx
const alphabetically = people.sort()
```

### 8. Sum up the instances of each of these

我的答案：

```jsx
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
const sum = data.reduce((acc, cur) => {
  // console.log("acc=", acc, "cur=", cur)
  // console.log(acc[cur])
  if(acc[cur]){
    acc[cur] ++;
  } else {
    acc[cur] = 1;
  }
  return acc;
},{})

console.log(sum); // {car: 5, truck: 3, bike: 2, walk: 2, van: 2}
```

💡 `acc[cur]` 其實就等於 `acc.cur` 也是物件中取得屬性值的表達方式之一

舉例來說：

```jsx
const people1 = {
	name: "Elena",
	age: 18,
	isMale: false,
}

people1["name"] = people1.name = "Elena"
```

💡 `if(acc[cur])` 這邊的意思是：if `acc.cur` is ture 這句話就等於 if `acc.cur` is 1
