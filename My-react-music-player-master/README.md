# music by react  

简易web音乐播放器

截图：
![](http://wx1.sinaimg.cn/mw690/41e13d0bly1fl9behn5nuj21kw0v8grs.jpg)

## 项目开发思想

* WebMusic基于React.js、JPlayer、Pubsub.js、webpack建立起来得单页应用
* 项目通过React构建开发，并充分体现前端项目组件化，模块化的思想
* 而react-router则实现应用的前端路由，管理url
* pubsub-js则实现子组件与父组件交互通信，并实现各组件状态改变
* 应用的音乐播放、逻辑动作则是由JPlayer、react方法组件实现

## 技术栈
react(v16) + react-router(v4.2) + webpack(v3.6) + pubsub-js(v1.5) + less(v3.0) + JPlayer

## 启动方法
前提条件：下载node

1. cd My-react-music-player
2. npm install
3. node server.js
