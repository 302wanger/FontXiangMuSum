var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

var appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)
