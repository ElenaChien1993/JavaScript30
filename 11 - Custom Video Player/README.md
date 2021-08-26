# Day 11 Custom HTML5 Video Player

[Courses Dashboard | Wes Bos](https://courses.wesbos.com/account/access/60e2872fb36fe451adb83f81/view/194129583)

### 目標

客製化 HTML5 的 video tag，用 Java Script 製作按鈕互動功能

- 點擊影片本身 & 播放鍵 >> 暫停 or 播放影片
- 點擊按鈕快轉 or 倒退
- 滑動調整音量和播放速度
- 點擊或拖移進度條去調整播放時間點

### 執行步驟

1. 存取需要的 DOM 元素
2. 做 toggle 播放和暫停功能
    1. 依據影片狀態 `video.paused` 來判斷要執行 `.play()` 還是 `.pause()`
    2. 用 eventListener 串接按鈕和 fn

        ```jsx
        // 方式一
        function togglePlay() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        toggle.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        ```

        ```jsx
        // 方式二：三元運算子
        function togglePlay() {
            video.paused ? video.play() : video.pause()
        }

        toggle.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        ```

        使用中括號 [] 包起來的會自動變成字串，先存取到這個物件屬性，再做呼叫

        ```jsx
        // 方式三：使用字符串執行 method
        function tooglePlay() {
            const method = vidoe.paused ? 'play' : 'pause';
            video[method]();
        }
        ```

    3. 切換 toggle 的按鈕圖標（播放 or 暫停）

        用 event 去監聽 video 原有的事件 play / pause

        ```jsx
        function updateButton() {
            const icon = this.paused ? '►' : '❚ ❚' ;
            toggle.textContent = icon;
        }

        video.addEventListener('play', updateButton);
        video.addEventListener('pause', updateButton);
        ```

3. 做點擊按鈕，影片快轉或倒退的功能
    1. 將 skip 按鈕用 forEach 串接 event listener（按鈕有兩個）
    2. 製作 skip fn：修改 `video.currentTime` ，每點擊一次就加上該按鈕相對應的值

    ```jsx
    function skip() {
        console.log(this.dataset.skip);
        video.currentTime += parseFloat(this.dataset.skip);
    }

    skipButtons.forEach(button => button.addEventListener('click', skip));
    ```

4. 滑動調整音量和播放速度
    1. 監聽滑動桿的 change event & mousemove event
    2. 當元素的 att value 變更時，連動變更 video 本身的屬性值

    ```jsx
    function handleRangeUpdate() {
        video[this.name] = this.value;
        // console.log(this.value);
        // console.log(this.name);
    }

    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
    ```

5. 進度條更新影片時間軸
    1. 進度條即時隨著時間軸更新

        用 flex-basis 調整百分比，去對應現在時間點 / 影片總長的百分比比例

        再用 append style 上去

        ```jsx
        function handleProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            // append style 上去
            progressBar.style.flexBasis = `${percent}%`;
        }

        // 當 video.currentTime 改變時會觸發 timeupdate 事件
        video.addEventListener('timeupdate', handleProgress);
        ```

    2. 點擊進度條 + 拖曳也可即時同步更新影片時間軸

        ```jsx
        // 要製作點擊後拖曳觸發的效果 >> 在 mousedown 後拖曳才觸發
        let mousedown = false;

        progress.addEventListener('click', scrub);
        // progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progress.addEventListener('mousemove', (e) => {
            if (mousedown) {
                scrub(e);
            }
        });
        progress.addEventListener('mousedown', () => mousedown = true);
        progress.addEventListener('mouseup', () => mousedown = false);
        ```

6. [extra] 製作 full-screen 按鈕

    使用 HTML5 fullscreen API

    ```jsx
    const fullScreen = player.querySelector('.fullScreen');

    function toggleFullScreen() {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
    }

    fullScreen.addEventListener('click', toggleFullScreen);
    ```

---

## 學習筆記

### 1. HTML Audio/Video DOM Reference

[HTML Audio/Video DOM Reference](https://www.w3schools.com/tags/ref_av_dom.asp)

- 【 屬性 Property 】

    `video.paused`：判斷影片的播放狀態，暫停 or 播放中（true / false）
    ＊沒有 play 的屬性判斷＊

    `video.currentTime`：設定或回傳影片目前的時間（秒）

    `video.controls`：瀏覽器提供基本播放器調整介面（true / false）

    `video.playbackRate`：影片播放速度，預設是 1.0

    `video.volume`：影片音量，0 - 1 數值

    `video.duration`：影片的時間長度

- 【 方法 Method 】

    `video.play()`：播放影片

    `video.pause()`：暫停影片

- 【 事件 Event 】

    `play`

    `pause`

    `timeupdate`：當 `video.currentTime` 改變時會觸發

### 2. dataset 複習

[Using data attributes - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

在 HTML 中可放入自訂的標籤，Ex：`<button data-skip="-10">` 

若要取得該 att 的值 >> `HTMLelement.dataset.skip`

### 3. parseInt() / parseFloat()

[使用 parseFloat()、parseInt()、Number() 轉換型別](https://dylan237.github.io/js-parse-to-number.html)

兩者共同特性：

1. return 字串中第一個數字
2. 開頭和結尾可以是空格
3. 若第一個字符非數字則 return NaN
- `**parseFloat()**`：將字串轉換成浮點數 return

    ```jsx
    parseFloat("10")           // 10
    parseFloat("10.33")        // 10.33
    parseFloat("34 45 66")     // 34
    parseFloat(" 60 ")         // 60
    parseFloat("40 years")     // 40
    parseFloat("He was 40")    // NaN
    ```

- `**parseInt()**`：將字串轉換成整數 return

    ```jsx
    parseInt("10")           // 10
    parseInt("10.33")        // 10
    parseInt("34 45 66")     // 34
    parseInt(" 60 ")         // 60
    parseInt("40 years")     // 40
    parseInt("He was 40")    // NaN
    ```

### 4. flex 複習

[圖解：CSS Flex 屬性一點也不難](https://wcc723.github.io/css/2017/07/21/css-flex/)

[Flex 空間計算規則](https://wcc723.github.io/css/2020/03/08/flex-size/)

**flex-basis**

決定 flexbox 排版 item 的初始寬/高（取決於 flex-direction 的方向）

- auto預設值，根據 item 的內容決定寬/高
- <width/height> 指定特定的寬/高，可以是數值也可以是比例

當 `flex-direction: row` 時，`flex-basis` 會決定了 width

當 `flex-direction: column` 時，`flex-basis` 會決定了 height

### 5. 全螢幕功能

[[Day 20]screenfull.js - 全螢幕顯示就是這麼簡單 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10186764)

[HTML5 fullscreen API 將 iframe 以全螢幕顯示](https://ssk7833.github.io/blog/2016/01/10/show-iframe-in-fullscreen-by-html5-fullscreen-api/)
