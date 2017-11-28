// 引入2个库
var fs = require('fs')
var request = require('sync-request')
var cheerio = require('cheerio')


// ES5 定义一个类
// var Movie = function() {
//     this.score = 0
//     this.quote = ''
//     this.ranking = 0
//     this.coverUrl = ''
// }

// ES6 定义一个类存储电影信息
class Movie {
    constructor() {
        // 分别是电影名/评分/引言/排名/封面图片链接/别名
        this.name = ''
        this.score = 0
        this.quote = ''
        this.ranking = 0
        this.coverUrl = ''
        this.otherNames = ''
    }
}

var log = console.log.bind(console)

// 从获取的数据中获取内容
var movieFromDiv = (div) => {
    var e = cheerio.load(div)

    // 创建一个电影类的实例并且获取数据
    // 这些数据都是从 html 结构里面人工分析出来的
    var movie = new Movie()
    movie.name = e('.title').text()
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()

    var pic = e('.pic')
    movie.ranking = pic.find('em').text()
    movie.coverUrl = pic.find('img').attr('src')

    // 删除字前的多余空格
    let other = e('.other').text()
    movie.otherNames = other.slice(3).split(' / ').join('|')

    return movie
}
// 判断是否已经缓存数据
// 加快加载速度
var cachedUrl = (url) => {
    // 1.确定缓存的文件名
    var cacheFile = 'cached_html/' + url.split('?')[1] + '.html'
    // 2.检查缓存文件是否存在
    // 如果存在，读取缓存文件
    // 如果不存在，就下载并写入缓存文件
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        var data = fs.readFileSync(cacheFile)
        return data
    } else {
        // 用 GET 方法获取 url 链接的内容
        // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
        var r = request('GET', url)
        // utf-8 是网页文件的文本编码
        // 如果文档是乱码，用gbk
        var body = r.getBody('utf-8')
        // 写入body到文件夹cached_html
        fs.writeFileSync(cacheFile, body)
        return body
    }
}
// 从url获取数据
var movieFromUrl = (url) => {
    // 判断是否已经缓存过
    var body = cachedUrl(url)
    // cheerio.load 用来把 HTML 文本解析为一个可以操作的 DOM
    var e = cheerio.load(body)

    // 一共有 25 个 .item
    var movieDivs = e('.item')
    // 循环处理 25 个 .item
    var movies = []
    for (var i = 0; i < movieDivs.length; i++) {
        var div = movieDivs[i]
        // 获取到 div 的 html 内容
        // 然后扔给 movieFromDiv 函数来获取到一个 movie 对象
        // var d = e(div).html()
        // 得到电影信息，然后进行解析
        var m = movieFromDiv(div)
        movies.push(m)
    }
    return movies
}
// 保存数据
var saveMovie = (movies) => {
    // JSON.stringify 第 2 3 个参数配合起来是为了让生成的 json
    // 数据带有缩进的格式，第三个参数表示缩进的空格数
    // 建议当套路来用
    // 如果你一定想要知道原理，看下面的链接（不建议看）
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    var s = JSON.stringify(movies, null, 2)
    // 把 json 格式字符串写入到 文件 中
    var fs = require('fs')
    var path = 'douban.txt'
    fs.writeFileSync(path, s)
}

// 保存封面图片
var downloadCovers = (movies) => {
    for (var i = 0; i < movies.length; i++) {
        var m = movies[i]
        var url = m.coverUrl
        // 保存图片的路径
        var path = 'covers/' + m.name.split('/')[0] + '.jpg'
        // 获取图片并存入指定路径
        var r = request('GET', url)
        var img = r.getBody()
        fs.writeFileSync(path, img)
    }
}

var __main = () => {
    // 主函数
    var movies = []
    for (var i = 0; i < 10; i++) {
        var start = i * 25
        var url = `https://movie.douban.com/top250?start=${start}&filter=`
        var moviesInpage = movieFromUrl(url)
        // 这是ES6的语法
        movies = [...movies, ...moviesInpage]
        // 常规语法
        // movies = movies.concat(moviesInpage)

    }
    saveMovie(movies)
    downloadCovers(movies)
}

__main()
