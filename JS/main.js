const list = document.querySelector('.todo-list');
const removeBtn = document.querySelector('.remove-button');
const addBtn = document.querySelector('.addBtn')
const input = document.querySelector('.input-area');
const todoHeader = document.querySelector('.todo-header');
let todoText, count;

const countItems = () => { 
    count = list.childElementCount;
    todoHeader.innerHTML = "You have " + count + " Tasks";
}
countItems();

document.addEventListener('DOMContentLoaded', renderLocalTasks);
input.addEventListener('input', () => todoText = input.value)
addBtn.addEventListener('click', createItem);
list.addEventListener('click', removeItem);

function createItem(e){
    e.preventDefault();

    let li = document.createElement('li');
    li.classList = "todo-list-item";

    let h3 = document.createElement('h3');
    h3.classList = "item-name";      
    h3.innerHTML = todoText;

    let button = document.createElement('button');
    button.classList = "remove-button";
    button.textContent = 'X';

    li.appendChild(h3);
    li.appendChild(button);

    if(input.value != undefined && input.value != ''){
        list.appendChild(li);
        saveLocalTasks(todoText);
        input.value = "";
        todoText = "";
    } else{
        alert("Text must be entered!");
    }
    countItems();
}

function removeItem(e){
    if(e.target.classList.contains("remove-button")){   
        let listItem = e.target.parentElement;
        if(listItem.children[0].tagName == 'H3'){     
            let todo = listItem.children[0].innerHTML;
            removeLocalTasks(todo);
        }
        list.removeChild(listItem);       
    }
    countItems();
}

function saveLocalTasks(todo){
    let tasks = [];
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }  else {
        tasks =  JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(todo);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function renderLocalTasks(){
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }  else {
        tasks =  JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((todo) => {
        let li = document.createElement('li');
        li.classList = "todo-list-item";

        let h3 = document.createElement('h3');
        h3.classList = "item-name";      
        h3.innerHTML = todo;

        let button = document.createElement('button');
        button.classList = "remove-button";
        button.textContent = 'X';

        li.appendChild(h3);
        li.appendChild(button);
        list.appendChild(li);
    });
    countItems();
}

function removeLocalTasks (todo){
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }  else {
        tasks =  JSON.parse(localStorage.getItem('tasks'));
    }
    indexOfTodo = tasks.indexOf(todo);
    tasks.splice(indexOfTodo,1);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}






