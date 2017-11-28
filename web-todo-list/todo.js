// ********************
// * 工具函数           *
// ********************

// 自己定义一个 log 函数
var log = console.log.bind(console)

// 用自己实现的 e 替代 document.querySelector
// 因为这个东西太长了
var e = function(selector) {
    var element = document.querySelector(selector)
    return element
}

// 用一个 todo 参数返回一个 todo cell 的 HTML 字符串
var templateTodo = function(todo) {
    var t = `
        <div class="todo-cell">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span contenteditable="true">${todo}</span>
        </div>
    `
    return t
}

// 载入所有存储在 localStorage 里面的 todo
var loadTodos = function() {
    var s = localStorage.savedTodos
    if (s == undefined) {
        return []
    } else {
        var ts = JSON.parse(s)
        return ts
    }
}

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

// ********************
// * 主体函数           *
// ********************
// todo 应用的流程
// 1. 进入页面, 首先调用 loadTodos 获取所有存储的 todos, 并且赋值给变量 todos
// 2. 拿到 todos 之后, 我们把这些 todos 插入到页面中
// 3. 点击 add 的时候, 我们做两件事情
//     a. 把 todo 保存到 localStorage 里面
//     b. 把 todo 显示在页面中
// 4. 点击 delete 的时候, 我们也做了两件事情
//     a. 从 localStorage 里面删除相应的 todo
//     b. 从页面中删除相应的 todo



// 获取所有存储在 localStorage 里的 todos, 并且赋值给变量 todos
var todos = loadTodos()

// add 的时候调用一个函数把 todo 存储到 localStorage 里面
// JSON 序列化
// var s = JSON.stringify([1, 2, 3, 4])
// log('序列化后的字符串', typeof s, s)
// var a = JSON.parse(s)
// log('反序列化后的数组', typeof a, a)

// 使用 JSON 序列化后，就可以把 todo 存入浏览器的 localStorage 了
var saveTodo = function(todo) {
    // 添加到 todos 数组
    todos.push(todo)
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

// 根据 container 和 todoCell 删除 todo
var deleteTodo = function(container, todoCell) {
    // 遍历 container 的所有子元素
    for (var i = 0; i < container.children.length; i++) {
        // 用 todo 来保存每次遍历的元素
        var todo = container.children[i]
        // 如果 todo 和 todoCell 是同一个元素,
        // 说明 i 就是我们要找的下标
        if (todo == todoCell) {
            // 删除数组的方法是 splice
            // i 表示从哪里开始删除, 1 表示删除多少个元素
            todos.splice(i, 1)
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}

var addBUttonTodos = function() {
    // 给 add button 绑定添加 todo 事件
    var addButton = e('#id-button-add')
    addButton.addEventListener('click', function() {
        // 获得 input.value
        // 1. 获取一个元素
        var todoInput = e('#id-input-todo')
        // 2. 用 .value 属性获取用户输入的字符串
        var todo = todoInput.value
        // 存储到 localStorage 中
        saveTodo(todo)
        // 添加到 container 中
        var todoContainer = e('#id-div-container')
        var t = templateTodo(todo)
        // 这个方法用来添加元素
        // 第一个参数 'afterbegin' 意思是放在最前
        todoContainer.insertAdjacentHTML('afterbegin', t)

        // 我们之前讲过 appendChild, 实际上 appendChild 很不好用
        // insertAdjacentHTML 这个是新方法, 更好用
    })
}

var todoContainerShow = function() {
    var todoContainer = e('#id-div-container')
    // 通过 event.target 的 class 来检查点击的是什么
    todoContainer.addEventListener('click', function(event) {
        // 获取被点击的元素
        var target = event.target
        // 得到被点击的元素后, 通过查看它的 class 来判断它是哪个按钮
        if (target.classList.contains('todo-done')) {
            // 给 todo div 开关一个状态 class
            // parentElement 是找到父元素
            var todoDiv = target.parentElement
            // 实际上可以不用自己写, 因为原生支持
            // todoDiv.classList.toggle('done')
            toggleClass(todoDiv, 'done')
        } else if (target.classList.contains('todo-delete')) {
            var todoCell = target.parentElement
            var container = todoCell.parentElement
            // 点击删除的时候, 从 localStorage 里面删除相应的 todo
            deleteTodo(container, todoCell)
            todoCell.remove()
        }
    })
}

// 把所有的 todos 插入到页面中
var insertTodos = function(todos) {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var todoContainer = e('#id-div-container')
        var t = templateTodo(todo)
        // 这个方法用来添加元素
        // 第一个参数 'afterbegin' 意思是放在最前
        todoContainer.insertAdjacentHTML('afterbegin', t)
    }
}


// ********************
// * 运行函数           *
// ********************
var _main = function() {
    todoContainerShow()
    addBUttonTodos()
    insertTodos(todos)
}

_main()













