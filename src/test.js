import string from './css.js'  // 把一大串影响浏览的代码放到一个文件里面（导出），然后再导入进来。 这种操作就叫：模块化。 ~~~~~~~~~

// const x = () => {run()}  x和run是等价的  ==> 如果一个函数什么都没干，只是单纯的调用了另一个函数，那么外面这个函数就是个废话  ==>  可以简写代码
// id = setInterval(() => {
//     run()
// }, time)
// 简写为:
// id = setInterval(run, time)  然后 继续简写

// 代码优化为面向对象的形式
const player = {
    id: undefined,
    time: 100,   // 这是默认播放速度
    ui: {    // ui表示是界面里的元素
        demo: document.querySelector('#demo'),
        demo2: document.querySelector('#demo2')        
    },
    events: {
        '#btnPause': 'pause',   
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    n: 1,
    init: () => {      // 一般一个对象都有一个初始化方法
        player.ui.demo.innerText = string.substring(0, player.n)
        player.ui.demo2.innerHTML = string.substring(0, player.n)  
        player.bindEvents()    
        player.play()
    },
    bindEvents: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {   // 防御性编程，只遍历是自己拥有的属性，避免继承的属性造成影响
                const value = player.events[key] // value的值是'pause'/ 'play' / 'slow'..
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run: () => {    
        player.n += 1
        if(player.n > string.length) {
            window.clearInterval(player.id)
            return
        }
        // console.log(n + ':' + string.substring(0, n))
        player.ui.demo.innerText = string.substring(0, player.n)
        player.ui.demo2.innerHTML = string.substring(0, player.n)
        player.ui.demo.scrollTop = demo.scrollHeight
    },
    play: () => {      // 播放
       player.id = setInterval(player.run, player.time)
    },
    pause: () => {     // 暂停
        window.clearInterval(player.id)
    },
    slow: () => {
        player.pause()
        player.time = 300
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 100
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()