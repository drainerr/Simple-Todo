const list = document.querySelector('.todo-list');
const removeBtn = document.querySelector('.remove-button');
const addBtn = document.querySelector('.addBtn')
const input = document.querySelector('.input-area');
const todoHeader = document.querySelector('.todo-header');
const popUp = document.querySelector('.popup');
const popUpBtn = document.querySelector('.popup-button');
const filterInput = document.querySelector('.filter-input');
let todoText, count, tasks = [];

const countItems = () => { 
    count = list.childElementCount;
    todoHeader.innerHTML = "You have " + count + " Tasks";
}
countItems();

document.addEventListener('DOMContentLoaded', renderLocalTasks);
input.addEventListener('input', () => todoText = input.value)
addBtn.addEventListener('click', createItem);
list.addEventListener('click', removeItem);
popUpBtn.addEventListener('click', ()=> popUp.style.display = "none");
filterInput.addEventListener('input', filterList);

function createItem(e){
    e.preventDefault();

    let li = document.createElement('li');
    li.classList = "todo-list-item";

    let p = document.createElement('p');
    p.classList = "item-name";      
    p.innerHTML = todoText; 

    let button = document.createElement('button');
    button.classList = "remove-button";
    button.textContent = 'X';

    li.appendChild(p);
    li.appendChild(button);
   // to make sure that inputted value is text and does not start with an empty space
    if(input.value != undefined && input.value != '' && !input.value.startsWith(' ')){
        list.appendChild(li);
        saveLocalTasks(todoText); // saving text(todo/task) to localStorage.
        input.value = "";
        todoText = "";
    } else {
        popUp.style.display = "flex";
    }

    countItems();
}

function removeItem(e){
    if(e.target.classList.contains("remove-button")){   
        let listItem = e.target.parentElement; // declaring li element
        if(listItem.children[0].tagName == 'P'){ // if li element truly contains a paragraph, remove its textContent(task/todo) from localstorage
            let todo = listItem.children[0].innerHTML;
            removeLocalTasks(todo);
        }
        list.removeChild(listItem);  //removing the entire 'li element' from the list
    }
    countItems();
}

function saveLocalTasks(todo){
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
    tasks.forEach((todo) => {  // rendering todos
        let li = document.createElement('li');
        li.classList = "todo-list-item";

        let p = document.createElement('p');
        p.classList = "item-name";      
        p.innerHTML = todo;

        let button = document.createElement('button');
        button.classList = "remove-button";
        button.textContent = 'X';

        li.appendChild(p);
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
    tasks.splice(indexOfTodo,1); // removing specific task/todo from an array
    localStorage.setItem('tasks',JSON.stringify(tasks)); //updating localstorage
}

function filterList(e){
    let text = e.target.value.toLowerCase();
    let items = list.getElementsByTagName('li');
    Array.from(items).forEach((item) =>{
        let count = 0;
        if(item.children[0].tagName == 'P'){
            let task = item.children[0].textContent.toLowerCase();
            if(task.indexOf(text) != -1){
                item.style.display = "flex";
                count++;
                
            }else{
                item.style.display = "none";
            } 
            todoHeader.innerHTML = "You have " + count + " Tasks";
        }
    })
}





