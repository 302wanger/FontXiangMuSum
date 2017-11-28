// 轮播图
// 每个网站包括苹果都有的轮播图组件
/*
1. 写一个 div 里面有 3 个 img 标签
2. 只显示当前活动的 img 标签
3. 加 1 个按钮，点击的时候切换图片
*/

var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'wang-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-wangimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    // 切换小圆点
    // 1. 删除当前小圆点的 class
    var indiClassName = 'wang-white'
    removeClassAll(indiClassName)
    // 2. 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indicator = e(indiSelector)
    indicator.classList.add(indiClassName)
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // log('click slide')
    // 求出下一张图片的 id

    // if (activeIndex + 1 == numberOfImgs - 1) {
    //     nextIndex = 0
    // } else {
    //     nextIndex = activeIndex + 1
    // }
    // 下面这句和上面的效果是一样的
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.wang-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        var button = event.target
        // 找到 wang-slide div
        var slide = button.parentElement
        // 求出 button 的 data-offset
        // 上一张按钮的 offset 是 -1
        // 下一张按钮的 offset 是 1
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.wang-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indi 小圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof(index))
        var slide = self.closest('.wang-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.wang-slide')
    // 求出下一张图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        // 每 2s 都会调用这个函数
        playNextImage()
    }, interval)
}

var __main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
