let todoText, count;
const list = document.querySelector('.todo-list');
const removeBtn = document.querySelector('.remove-button');
const addBtn = document.querySelector('.addBtn')
const input = document.querySelector('.input-area');
const todoHeader = document.querySelector('.todo-header');

let countItems = () => { 
    count = list.childElementCount;
    todoHeader.innerHTML = "You have " + count + " Tasks";
}
countItems();

input.addEventListener('keyup', ()=>{
    todoText = input.value;
})

let createItem = (e) => {
    e.preventDefault();

    let li = document.createElement('li');
    li.classList = "todo-list-item";

    let h3 = document.createElement('h3');
    h3.classList = "item-name";      
    h3.innerHTML = todoText;

    let button = document.createElement('button');
    button.classList = "remove-button";

    let i = document.createElement('i');
    i.classList = "fas fa-times remove-image";
   
    button.appendChild(i);
    li.appendChild(h3);
    li.appendChild(button);

    if(input.value != undefined && input.value != ''){
        list.appendChild(li);
    } else{
        alert("Text must be entered!");
    }

    countItems();
    input.value = "";
    todoText = "";
}

addBtn.addEventListener('click', createItem);

let removeItem = (e) => {
    if(e.target.classList.contains("remove-button") || e.target.classList.contains("remove-image")){
        let listItem = document.querySelector('.todo-list-item');     
        list.removeChild(listItem);  
    }
    countItems();
}

list.addEventListener('click', removeItem);





