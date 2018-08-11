# Top-250_Movies

使用 node.js 来实现一个简单的豆瓣电影爬虫

第一步：安装 node.js 和 yarn

第二步：利用终端进入此文件夹，调用 yarn install 来安装用到的 node 库，出现 node_modules，这个文件夹里就是我们安装的库

第三步：douban.js 是我们的主程序，我们通过这个文件来实现爬虫。

# 如何启动程序

1. npm/yarn install 下载安装包，npm 和 yarn 二选一
2. node douban.js 运行程序，开始爬取数据

下面是各文件功能介绍：

1. cached_html：存储着豆瓣 top250 的 html 内容
2. covers：top250 电影的封面图片
3. node_modules：我们安装的 node 库
4. douban.js： 主程序，运行爬虫时调用它
5. douban.txt: 我们从 html 里拿到的 top250 数据，以 JSON 的格式存储
6. package.json：node 里我们用的的库，系统默认有
