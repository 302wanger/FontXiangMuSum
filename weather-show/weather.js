var log = console.log.bind(console)

var e = (selector) => document.querySelector(selector)

// 用原生写的ajax请求函数
var ajax = function(request) {
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}


var fetchWeather = function(callback) {
    var url = 'https://free-api.heweather.com/v5/forecast?city=xinjiang&key=7caf480d5fd8416c9f60e74658d70cfa'
    var request = {
        method: 'GET',
        url: url,
        callback: (data) => {
            data = JSON.parse(data)
            callback(data)
        }
    }
    ajax(request)
}

var configuredChart = function() {
    var element = e('#id-div-chart')
    var chart = echarts.init(element)
    return chart
}

var dailyForcast = function(weather) {
    var w = {
        date: [],
        max: [],
        min: [],
    }
    var forecast = weather.daily_forecast
    for (var i = 0; i < forecast.length; i++) {
        var f = forecast[i]
        var t = f.tmp
        w.max.push(t.max)
        w.min.push(t.min)
        w.date.push(f.date)
    }
    return w
}

var formattedWeather = function(weather) {
    var data = dailyForcast(weather)
    var option = {
        title: {
            text: '未来三天气温变化',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高气温','最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: data.date
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name:'最高气温',
                type:'line',
                data: data.max,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data: data.min,
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    }

    return option
}

var renderChart = function(data) {
    var weather = data.HeWeather5[0]
    var chart = configuredChart()
    var weather = formattedWeather(weather)
    
    chart.setOption(weather)
}

var __main = function() {
    fetchWeather(renderChart)
}

__main()
