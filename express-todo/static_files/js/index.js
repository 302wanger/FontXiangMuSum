// 可以封装成这样的一个函数
var ajax = function(method, path, data, responseCallback) {
    // 发送登录数据
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            responseCallback(r.response)
        }
    }
    // 处理 data
    data = JSON.stringify(data)
    // 发送请求
    r.send(data)
}

var insertInput = () => {
    var t = `
        <div class="input-group">
            <input id="id-input-task" class="form-control" placeholder="Why Not Today?">
            <span class="input-group-btn">
            <button id="id-button-add" class="todo-add btn btn-default">Add</button>
        </div>
    `
    var element = e('#id-div-todo-input')
    appendHtml(element, t)
}

var templateTodo = (todo) => {
    var task = todo.task
    var id = todo.id
    var className = ''
    if (todo.done) {
        className = 'completed'
    }
    var t = `
        <div class="todo-cell list-group-item ${className}" data-id="${id}">
            <button class="todo-complete btn btn-default">标记完成</button>
            <button class="todo-delete btn btn-default">删除</button>
            <span class="todo-task"> ${task}</span>
        </div>
    `
    return t
}

var insertTodo = (todo) => {
    var container = e('#id-div-todo-container')
    var html = templateTodo(todo)
    appendHtml(container, html)
}

var insertTodos = (todos) => {
    // log('todos', todos, todos.length)
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo)
    }
}

var apiTodoAll = callback => {
    var method = 'GET'
    var path = '/todo/all'
    var data = {}
    ajax(method, path, data, callback)
}

var apiTodoAdd = (task, callback) => {
    var method = 'POST'
    var path = '/todo/add'
    var data = {
        task: task
    }
    // 我们直接在 ajax 里面处理 data
    ajax(method, path, data, callback)
}

var apiTodoDelete = (id, callback) => {
    var method = 'GET'
    var path = '/todo/delete/' + id
    var data = {}
    ajax(method, path, data, callback)
}

var apiTodoComplete = (id, callback) => {
    var method = 'GET'
    var path = '/todo/complete/' + id
    var data = {}
    ajax(method, path, data, callback)
}

var bindEventAdd = () => {
    // 绑定 add 按钮的事件委托
    var container = e('#id-div-todo-input')
    var inputTast = e('#id-input-task')
    container.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-add')) {
            // 获取 input 的输入
            var input = e('#id-input-task')
            var value = input.value
            apiTodoAdd(value, function(data) {
                var todo = JSON.parse(data)
                // 往页面中插入被创建的 todo
                insertTodo(todo)
            })
        }
        // 整个add操作完成后将input初始化，以方便下次输入
        inputTast.value = ''
    })
}

var bindEventDelete = () => {
    // 绑定 delete 按钮的事件委托
    var container = e('#id-div-todo-container')
    container.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-delete')) {
            // 拿到 todo id
            // 在事件中调用删除函数, 获取 todo_id 并且传给删除函数
            // 用 ajax 发送给服务器
            var todoCell = self.closest('.todo-cell')
            var todoId = todoCell.dataset.id
            apiTodoDelete(todoId, function(todo) {
                log('删除成功', todo)
                // 删除成功后, 删除页面元素
                todoCell.remove()
            })
        }
    })
}

var bindEventComplete = () => {
    // 绑定 complete 按钮的事件委托
    var container = e('#id-div-todo-container')
    container.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-complete')) {
            // 拿到 todo id
            // 在事件中调用标记完成函数, 获取 todo_id 并且传给标记删除函数
            // 用 ajax 发送给服务器
            var todoCell = self.closest('.todo-cell')
            var todoId = todoCell.dataset.id
            apiTodoComplete(todoId, function(todo) {
                log('标记成功', todo)
                // 标记成功后, 在页面元素 cell 上面添加 class
                todoCell.classList.add('completed')
            })
        }
    })
}


var bindEvents = () => {
    bindEventAdd()
    bindEventDelete()
    bindEventComplete()
}

var __main = () => {
    apiTodoAll(function(data) {
        var todos = JSON.parse(data)
        insertTodos(todos)
    })
    insertInput()
    bindEvents()
}

__main()
