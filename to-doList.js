const form1 = document.querySelector("#form1");
const header1 = document.querySelector(".header1");
const input1 = document.querySelector(".input1");
const button1 = document.querySelector(".button1");
const form2 = document.querySelector("#form2");
const header2 = document.querySelector(".header2");
const button2 = document.querySelector(".button2");
const input2 = document.querySelector(".input2");
const todoList = document.querySelector(".todoList");

form1.addEventListener("submit", submitEvent);
function submitEvent(e) {
    e.preventDefault();
    print();
}

button1.addEventListener("click", print);
function print() {
    let todo = input1.value;
    if (todo.trim() !== "") {
        addTodoUI(todo);
        addLocalStorage(todo);
        showAlert("success", "Added to to-do list");
        input1.value = "";
    } else {
        showAlert("warning", "Please enter a to-do!");
    }
}

function addTodoUI(todo) {
    const li = document.createElement("li");
    li.textContent = todo;

    const a = document.createElement("a");
    a.href = "#";

    const i = document.createElement("i");
    i.className = "fa-solid fa-xmark";
    i.style.color = "blue";
    i.style.fontSize = "22px";
    i.addEventListener('mouseover', () => {
        i.style.opacity = "0.6";
    });
    i.addEventListener('mouseout', () => {
        i.style.opacity = "1";
    });

    const i2 = document.createElement("i");
    i2.className = "fa-solid fa-check";
    i2.style.marginRight = "15px";
    i2.style.color = "black";
    i2.addEventListener('mouseover', () => {
        i2.style.fontSize = "20px";
    });
    i2.addEventListener('mouseout', () => {
        i2.style.fontSize = "22px";
    });

    li.style.border = "0.5px solid gray";
    li.style.margin = "1rem 4rem";
    li.style.listStyleType = "none";
    li.style.padding = "1rem";
    li.style.borderRadius = "10px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.letterSpacing = "0.5px";
    li.style.fontSize = "20px";
    li.style.color = "black";

    a.appendChild(i2);
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    i.addEventListener("click", removeTodoUI);
    function removeTodoUI(e) {
        li.remove();
        removeLocalStorage(todo);
        removeCompletedStorage(todo); // Üstü çizili todoyu da sil
        e.preventDefault();
        showAlert("info", `'${li.textContent}' is removed`);
    }

    i2.addEventListener("click", checkTodo);
    function checkTodo(e) {
        e.preventDefault();
        li.style.textDecoration = "line-through";
        addCompletedStorage(todo);  // Üstü çizili todoları storaga sakladık
        removeLocalStorage(todo); 
        showAlert("success", `'${li.textContent}' is completed`);
    }
}

button2.addEventListener("click", removeAllTodoUI);
function removeAllTodoUI() {
    if (todoList.children.length > 0) {
        removeAllLocalStorage();
        removeAllCompletedStorage(); // Üstü çizilen todoları da temizle
        todoList.innerHTML = "";  // İçeriği temizledik
        showAlert("info", "All to-do removed.");
    } else {
        showAlert("warning", "No to-do to delete!");
    }
}

function addLocalStorage(todo) {
    const todos = checkLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalStorage(todoToDelete) {
    let todos = checkLocalStorage();
    todos = todos.filter(function (todo) {
        return todo !== todoToDelete;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeAllLocalStorage() {
    localStorage.removeItem("todos");
}

function checkLocalStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addCompletedStorage(todo) {
    const completedTodos = checkCompletedStorage();
    completedTodos.push(todo);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

function removeCompletedStorage(todoToDelete) {
    let completedTodos = checkCompletedStorage();
    completedTodos = completedTodos.filter(function (todo) {
        return todo !== todoToDelete;
    });
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

function removeAllCompletedStorage() {
    localStorage.removeItem("completedTodos");
}

function checkCompletedStorage() {
    let completedTodos;
    if (localStorage.getItem("completedTodos") === null) {
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
    }
    return completedTodos;
}

// Storage'daki todo'ları arayüze yazdır.
document.addEventListener("DOMContentLoaded", loadStorageToUI);
function loadStorageToUI() {
    let todos = checkLocalStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    });

    // Üstü çizili todoları da UI'a ekle
    let completedTodos = checkCompletedStorage();
    completedTodos.forEach(function (todo) {
        addTodoUI(todo); 
        const lastTodo = todoList.lastElementChild;  // Son eklenen todoyu aldık
        lastTodo.style.textDecoration = "line-through";  // Üstünü çizdik
    });
}

input2.addEventListener("keyup", filterValue);
function filterValue(e) {
    let value = e.target.value.toLowerCase().trim();
    let todos = Array.from(todoList.children);

    if (todos.length > 0) {
        todos.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(value)) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        });
    } else {
        showAlert("warning", "Filtreleme için en az bir todo bulunmalıdır.");
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.textContent = message;
    div.className = "alert alert-" + type;
    form1.appendChild(div);

    div.style.marginBottom = "2rem";
    div.style.marginLeft = "2rem";
    div.style.marginRight = "2rem";
    div.style.borderRadius = "20px";
    div.style.letterSpacing = "2px";

    setTimeout(function () {
        div.remove();
    }, 2000);
}


