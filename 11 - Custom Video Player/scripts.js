// 先存取需要的 DOM 元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

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

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);