let add_button = document.getElementById('add-button');
let del_buttons = document.getElementsByClassName('delete'); 
let task_container = document.querySelector('.tasks-container');
let task_input = document.getElementById('new-task')
let completeAll = document.getElementById('check-all-button');
let clearComplete = document.getElementById('clearComplete');
let showAll = document.getElementById('showAll');
let showComplete = document.getElementById('showComplete');
let showInprogress = document.getElementById('showInprogress');
let showNotStarted = document.getElementById('showNotStarted');
let edition = document.getElementById('edit');
let box = document.querySelector('.container')
showNotStarted.style.color="white";
let showState = 'showAll';
showAll.style.color="white";
showAll.style.color="white";
let todos = [];

//let task_card_string = "<div class=\"task-card not-started\"><div class=\"status-icon\"></div><p class=\"task-text\"></p><p class=\"task-status\">Not-Started</p><ion-icon class=\"delete fs-large mg-10\" name=\"close-circle-outline\"></ion-icon></div>"
let task_card_string = "<div class=\"status-icon\"></div><p class=\"task-text\"><p class=\"task-status color-red\">Not-Started</p><ion-icon class=\"delete fs-large mg-10\" name=\"close-circle-outline\"></ion-icon>"
let task_count = 5;
updateTaskCount();
eventSetter();

function updateTaskCount(){
    document.getElementById('task-left-count').innerHTML = task_count;
}

function eventSetter(){
    let del_buttons = document.getElementsByClassName('delete'); 
    for(del of del_buttons){
        del.addEventListener('click',removeCard);
    }
    let progress_buttons = document.getElementsByClassName('status-icon');
    for(p of progress_buttons){
        p.addEventListener('click', changeProgress);
    }
    let cards = document.getElementsByClassName('task-card');
    console.log(cards);
    for(let i=0;i<cards.length;i++){
        console.log(cards[i]);
        cards[i].addEventListener('mouseover', function(){
            console.log(cards[i]);
            cards[i].children[3].style.visibility="initial";
        })
        cards[i].addEventListener('mouseleave', function(){
            console.log(cards[i].children[3].style.visibility);
            cards[i].children[3].style.visibility="hidden";
        })
    }
    
}

function reassignIDs(){
    let cards = document.getElementsByClassName('task-card');
    let count=1;
    for(card of cards){
        card.setAttribute("id", "t"+(count++));
        card.eve
    }
}

function resetColor(){
    let allButtons = document.getElementsByClassName('filter-button');
    for(button of allButtons)
        button.style.color = "white";
}


add_button.addEventListener('click', function(){


    //Adding the new task in the task container
    let task_card = document.createElement('div');
    task_card.innerHTML= task_card_string
    task_card.setAttribute("class", "task-card not-started");
    task_card.setAttribute("id", "t"+(++task_count));
    task_container.appendChild(task_card);
    let card_text = document.querySelector('#t' + task_count + " p");
    card_text.innerHTML = task_input.value;
    task_input.value = "";
    
    
     
    const dueDate = document.getElementById('due-date')
    const dueDateValue = dueDate.value
    // console.log(dueDateValue)

    const description= document.getElementById('new-description')
    const descriptionValue =  description.value
    // console.log(descriptionValue)

    let desk = document.createElement('p');
    desk.innerText = descriptionValue ;
    task_card.appendChild(desk)
    let dateDone = document.createElement('p');
    dateDone.innerText = dueDateValue ;
    task_card.appendChild(dateDone)
    
    createToDo(dueDateValue, descriptionValue  )
    
    document.getElementById('description').value = "";

    //Change Task Count
   updateTaskCount();
   eventSetter();

})

document.addEventListener("keydown", function (event){
    let keyValue = event.key;
    if(keyValue=="Enter"){
         //Adding the new task in the task container
    let task_card = document.createElement('div');
    task_card.innerHTML= task_card_string
    task_card.setAttribute("class", "task-card not-started");
    task_card.setAttribute("id", "t"+(++task_count));
    task_container.appendChild(task_card);
    let card_text = document.querySelector('#t' + task_count + " p");
    card_text.innerHTML = task_input.value;
    task_input.value = "";
    
    //Change Task Count
   updateTaskCount();
   eventSetter();
    }
      
  });

function removeCard(){
    let parent = this.parentElement;
    parent.classList.add('delete-card');
    setTimeout(function(){
        // console.log(this);
        parent.parentNode.removeChild(parent);
        updateTaskCount();
        reassignIDs(); 
        eventSetter();
    }, 550)
    task_count --;
    
    // this.parentElement.parentNode.removeChild(this.parentElement);
}

function changeProgress(){
    // console.log("hello");
    let parentCard = this.parentElement;
    let status = parentCard.classList[1];
    parentCard.classList.remove(status);
    let statusElem = parentCard.children[2];
   
    if(status == 'not-started'){
        parentCard.classList.add('In-progress');
        statusElem.innerHTML="In-progress";
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-blue');

    }
    else if(status =='Completed'){
        parentCard.classList.add('In-progress');
        statusElem.innerHTML="In-progress";
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-blue');
    }
    else{
        parentCard.classList.add('Completed');
        statusElem.innerHTML="Completed at " + Date();
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-green');
    }
}

completeAll.addEventListener('click', function(){
    let progress_buttons = document.getElementsByClassName('status-icon');
    for(p of progress_buttons){
        let parentCard = p.parentElement;
        let status = parentCard.classList[1];
        parentCard.classList.remove(status);
        let statusElem = parentCard.children[2];
        parentCard.classList.remove(status);
        parentCard.classList.add("Completed");
        statusElem.innerHTML="Completed at " + Date();
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-green');
    }
});

clearComplete.addEventListener('click', function(){
    let cards = document.getElementsByClassName('Completed');
    let parent = cards[0].parentElement;
    let length = cards.length;
    let count=length-1;
    intervalID = setInterval(function(){
        cards[count].classList.add('delete-card');
        task_count--;
        setTimeout(function(){
            this.parentNode.removeChild(this); 
            updateTaskCount();
      }.bind(cards[count]),500 )
        count--;
        if(count<0){
            clearInterval(intervalID);
        }
    }, 500);
    

});
showAll.addEventListener('click',function(){
    const allCards = document.getElementsByClassName('task-card');
    if(showState !='showAll'){
        resetColor();
        this.style.color="yellow";
        
        for(card of allCards){
            card.style.display = "flex";

            
        }
        showState ='showAll';
        alert('No Tasks')
    }else{
        // showAll.innerText = 'No Tasks'
        // box.appendChild(showAll)
        // console.log(showAll)
        
    }
});



showComplete.addEventListener('click',function(){
    
    if(showState !='showComplete'){
        resetColor();
        this.style.color="#33c747";
        let allCards = document.getElementsByClassName('task-card');
        // allCards[0].style.display = "none";
        for(card of allCards){
            if(card.classList[1]!='Completed')
                card.style.display = "none";
               
            else
                card.style.display = "flex";
        }
        showState = 'showComplete';
    }
});

showInprogress.addEventListener('click',function(){

    if(showState !='showInprogress'){
        resetColor();
        this.style.color="blue";
        let allCards = document.getElementsByClassName('task-card');
        // allCards[0].style.display = "none";
        for(card of allCards){
            if(card.classList[1]!='In-progress')
                card.style.display = "none";
            else
                card.style.display = "flex";
        }
        showState = 'showInprogress';
    }
});
showNotStarted.addEventListener('click',function(){

    if(showState !='showNotStarted'){
        resetColor();
        this.style.color="red";
        let allCards = document.getElementsByClassName('task-card');
        // allCards[0].style.display = "none";
        for(card of allCards){
            if(card.classList[1]!='not-started')
                card.style.display = "none";
            else
                card.style.display = "flex";
        }
        showState = 'showNotStarted';
    }
});



edition.addEventListener('click',function(){

    if(showState !='showNotStarted'){
        resetColor();
        this.style.color="red";
        let allCards = document.getElementsByClassName('task-card');
        let title = document.getElementsByClassName('task-text');
        // allCards[0].style.display = "none";
        for(card of allCards){
            if(card.classList[1]!='not-started')
                card.style.display = "none";
                
                // let addition = document.createElement('input')
            else
                card.style.display = "flex";
        }
        showState = 'showNotStarted';
    }
    
    render()
    
    

});

//Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
//Check if it is an array
if (Array.isArray(savedTodos)) {
    todos = savedTodos;

}else {
    todos = [{ 
        dueDateValue:'2022-07-07', id: 'id1'}, {dueDateValue:'2022-08-07', id: 'id2'}];    

}
console.log(todos)

function createToDo(dueDateValue, descriptionValue){
    const id = '' + new Date().getTime(); /*creating an id in javascript that works like a timestamp*/

    todos.push({dueDateValue:dueDateValue, id:id});

saveTodos();
}

//save to dos
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//view section
function render() {
    //reset our list
    document.getElementById('description').innerHTML = '';
    // re-render the updated list
    todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.innerText = todo.dueDateValue + ' - ' +todo.descriptionValue;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'remove';
    deleteButton.style = 'margin-left: 13px; background-color: #7c7b6b;';
    deleteButton.onclick = deleteTodo;/*to initiate an event ie when the button is clicked*/ 
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(element); 
    })
}