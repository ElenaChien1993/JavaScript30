// 先存取需要的 DOM 元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullScreen');

// 做 toggle 播放和暫停功能
function togglePlay() {
    video.paused ? video.play() : video.pause()
}

// function togglePlay() {
//     const method = video.paused ? 'play': 'pause';
//     video[method]();
// }

// function togglePlay() {
//     if (video.paused) {
//         console.log('play')
//         video.play();
//     } else {
//         console.log('pause')
//         video.pause();
//     }
// }

// 更新 toggle 按鈕的圖示
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚' ;
    toggle.textContent = icon;
}

// 製作快進 or 倒退功能
function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

// 滑動調整音量和播放速度
function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.value);
    // console.log(this.name);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    // append style 上去
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e);
    // 用 click 當下的 x 位置算出所佔的影片長度佔比
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// 製作全螢幕 fn
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

toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);
// 當 video.currentTime 改變時會觸發 timeupdate 事件
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

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

fullScreen.addEventListener('click', toggleFullScreen);

