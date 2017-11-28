# FontXiangMuSum
自己写的前端项目的集合

提示：所有Node项目需在当前项目执行yarn install 安装依赖库后方可运行

目录：
1. 图片轮播图
2. 豆瓣数据可视化
3. Express实现todo应用
4. 豆瓣Top250数据爬虫
5. 微信小程序静态页面demo
6. 网页版天气预报
7. React音乐播放器
8. 个人静态网站：http://www.redwangpangzi.com
9. 利用Node和构建的多人博客项目(doing)





## 1.图片轮播图

实现功能：
1. 点击左右标签进行图片切换
2. 点击图片下方小圆点进行图片切换
3. 图片自动轮播

![](sumJietu/img-loop.png)

## 2.豆瓣数据可视化
1. 使用 Node的request库和cheerio库写爬虫来获取 Top250的电影信息：封面图、名称、评分、排名
2. 使用 jQuery、Lodash、bodyParser库和 Express 框架构建后端框架，使用自定义的AJAX API进行数据传送。
3. 使用 ECharts 生成图表样式并在前端页面生成。

![](http://wx2.sinaimg.cn/mw690/41e13d0bly1fjpaqhdbg3j20g30r8jtg.jpg)

## 3.Express实现todo应用
这是一个前端和后端联合的尝试
使用到的技术：
前端：利用HTML组织整体结构，利用CSS和Boostrap进行页面布局，原生JavaScript进行事件绑定
后端：利用Node.js与Express框架构建路由
通信：利用AJAx进行前端与后端的数据通信

![](sumJietu/todo.png)

## 6.网页版天气预报
1. 使用和风天气API获取最近3天天气情况。
2. 利用AJAX传输和风天气API的数据。
3. 使用ECharts对数据进行处理并网页化。

![](sumJietu/web-pre.jpg)

## 7.React音乐播放器
1. WebMusic是基于React.js、JPlayer、Pubsub.js、webpack建立起来得单页应用
2. 项目通过React构建开发，并充分体现前端项目组件化，模块化的思想
3. 而react-router则实现应用的前端路由，管理url
4. pubsub-js则实现子组件与父组件交互通信，并实现各组件状态改变
5. 应用的音乐播放、逻辑动作则是由JPlayer、react方法组件实现

![](sumJietu/React_music_player.png)



