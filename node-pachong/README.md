# Top-250_Movies
使用node.js来实现一个简单的豆瓣电影爬虫

第一步：按照node.js 和 yarn

第二步：利用终端进入此文件夹，调用yarn install来安装用到的node库，出现node_modules，这个文件夹里就是我们安装的库

第三步：douban.js是我们的主程序，我们通过这个文件来实现爬虫。

下面是各文件功能介绍：
1. cached_html：存储着豆瓣top250的html内容
2. covers：top250电影的封面图片
3. node_modules：我们安装的node库
4. douban.js： 主程序，运行爬虫时调用它
5. douban.txt: 我们从html里拿到的top250数据，以JSON的格式存储
6. package.json：node里我们用的的库，系统默认有