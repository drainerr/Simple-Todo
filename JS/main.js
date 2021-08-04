let todoText, count;
const list = document.querySelector('.todo-list');
const removeBtn = document.querySelector('.remove-button');
const addBtn = document.querySelector('.addBtn')
const input = document.querySelector('.input-area');
const todoHeader = document.querySelector('.todo-header');

let tasksArr = []; 
let countItems = () => { 
    count = list.childElementCount;
    todoHeader.innerHTML = "You have " + count + " Tasks";
}
countItems();

let createAndPushObj = (objText) =>{    
    let obj = {
        text: "",
        id: ""
    }
    obj.text = objText;
    obj.id = (tasksArr.length) + Math.floor(Math.random() * 99) + objText.charAt(0); 
    tasksArr.push(obj);  
}

let createItem = (e) => {
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
        createAndPushObj(input.value); 
    } else{
        alert("Text must be entered!");
    }
    countItems();
    input.value = "";
    todoText = "";
}
let removeItemFromArray = (item) => {
    let index = tasksArr.indexOf(item) 
    if (index > -1) {
        tasksArr.splice(index, 1);
      }
}

let removeItem = (e) => {
    if(e.target.classList.contains("remove-button")){   
        // remove element from an array !!!
        let currentLi = e.target.parentElement;
        if(currentLi.children[0].tagName == 'H3'){
            let h3Text = currentLi.children[0].innerHTML;
            // if tasksArr[obj]["text"] ==  h3text then remove obj
            tasksArr.map((item) => item.text == h3Text && removeItemFromArray(item));
        }
        // remove element from list 
        let listItem = e.target.parentElement;  
        list.removeChild(listItem);       
    }
    countItems();
}

input.addEventListener('input', () => todoText = input.value)
addBtn.addEventListener('click', createItem);
list.addEventListener('click', removeItem);





