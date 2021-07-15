# Day 07 Array Cardio Part 2

[Courses Dashboard | Wes Bos](https://courses.wesbos.com/account/access/60e2872fb36fe451adb83f81/view/194130101)

- 一些 array method 的練習題目

## array.every() & array.some()

[JavaScript 陣列處理方法 [filter(), find(), forEach(), map(), every(), some(), reduce()]](https://wcc723.github.io/javascript/2017/06/29/es6-native-array/#Array-prototype-every)

- `array.every()`  檢查所有的陣列是否符合條件，這僅會回傳一個值 `true` or `false`

    ```jsx
    var array = [
      {
        name: 'Casper',
        age: 18
      },
      {
        name: 'Wang',
        age: 24
      },
      {
        name: 'Bobo',
        age: 1
      },
      {
        name: '滷蛋',
        age: 3
      }
    ];

    var ans = array.every(function(item, index, array){
      console.log(item, index, array); // 物件, 索引, 全部陣列
      return item.age > 10 // 當全部 age 大於 10 才能回傳 true
    });
    console.log(ans); // false: 只要有部分不符合，則為 false

    var ans2 = array.every(function(item, index, array){
      return item.age < 25
    });
    console.log(ans2); // true: 全部 age 都小於 25
    ```

- `array.some()`  檢查部分的陣列是否符合條件，這僅會回傳一個值 `true` or `false`

    ```jsx
    var ans = people.some(function(item, index, array){
      return item.age > 10 // 當全部 age 大於 10 才能回傳 true
    });
    console.log(ans);  // true: 只要有部分符合，則為 true

    var ans2 = people.some(function(item, index, array){
      return item.age < 25
    });
    console.log(ans2); // true: 只要有部分符合，則為 true  

    var ans2 = people.some(function(item, index, array){
      return item.age > 25
    });
    console.log(ans2); // false: 全部都不符合則為 false
    ```

## array.find()

`find()` 與 `filter()` 很像，但 `find()` 只會回傳一次值，且是第一次為 `true` 的值。

```jsx
var findEmpty = people.find(function(item, index, array){
});
console.log(findEmpty);          // 沒有條件，會是 undefined

var findAgeThan5 = people.find(function(item, index, array){
  return item.age > 5;           // 取得大於五歲的
});
console.log(findAgeThan5);       // 雖然答案有兩個，但只會回傳 Casper 這一個物件

var findLike = people.find(function(item, index, array){
  return item.like === '蘿蔔泥';  // 取得陣列 like === '蘿蔔泥'
});
console.log(findLike);           // 雖然答案有兩個，但只會回傳第一個 Bobo 物件
```

## array.findIndex()

就跟上面的 `find()` 一樣，只是 return 的是該值的位置 index

如果沒有符合的對象，會 return -1

```jsx
const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];

const index = fruits.findIndex(fruit => fruit === "blueberries");

console.log(index); // 3
console.log(fruits[index]); // blueberries
```

---

## 練習題目

1. Is at least one person 19 or older?

    我的答案：

    ```jsx
    const older = people.some(i => i.year < 2002);
    console.log(older); // true
    ```

    老師答案：

    用 methods 取得現在的年份啦 QQ

    ```jsx
    const older = people.some(i => {
      let currentYear = new Date().getFullYear();
      return currentYear - i.year >= 19;
    })
    console.log(older); // true
    ```

2. Is everyone 19 or older?

    ```jsx
    const everyOlder = people.every(i => {
      let currentYear = new Date().getFullYear();
      return currentYear - i.year >= 19;
    })
    console.log(everyOlder); // false
    ```

3. Find the comment with the ID of 823423

    ```jsx
    const ans = comments.find(i => i.id === 823423);
    console.log(ans.text);
    ```

4. Delete the comment with the ID of 823423

    ```jsx
    const delIndex = comments.findIndex(i => i.id === 823423);
    console.log(delIndex); // 1
    comments.splice(delIndex, 1);
    console.log(comments);

    // 如果想把刪除後的結果另外放在新的 array 中，可以用以下做法，就可以不動到原本 array
    const delIndex = comments.findIndex(i => i.id === 823423);
    console.log(delIndex);

    const newComments = [
      ...comments.slice(0, delIndex),
      ...comments.slice(delIndex + 1)
    ];
    console.log(newComments);
    // 因為 slice 本身 return 的值就是被刪掉的元素
    // 用 ... 才不會在陣列中又包陣列
    ```

### 小複習：刪除陣列中的物件 `splice()`

[Array.prototype.splice() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

語法：

```jsx
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)
```

- start：從哪個 index 開始（刪除）
- deleteCount：要刪掉幾個
- item：要新增的物件

💡 如果 deleteCount 被省略，或是超過整個陣列長度，則會刪掉從 start 開始後面的所有元素

```jsx
let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
let removed = myFish.splice(2) // 從 index 2 開始，後面都刪去（因為沒放第二個參數）

// myFish is ["angel", "clown"]
// removed is ["mandarin", "sturgeon"]
```

💡 這個方式會修改原陣列，而**自己 return 的值是被刪掉的那個值**

```jsx
let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
let removed = myFish.splice(2, 0, 'drum') // 從位置 2 刪掉 0 個，新增 "drum"

// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
// removed is [], no elements removed 沒刪掉任何東西會回傳空陣列
```

```jsx
let myFish = ['angel', 'clown', 'drum', 'sturgeon']
let removed = myFish.splice(2, 1, 'trumpet') // 從位置 2 刪掉 1 個，新增 "trumpet"

// myFish is ["angel", "clown", "trumpet", "sturgeon"]
// removed is ["drum"] // 被刪掉的那個
```
