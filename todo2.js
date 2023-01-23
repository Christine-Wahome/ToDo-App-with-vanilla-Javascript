//model section
            /*if localStorage has a todos array, then use it. Otherwise use this default array*/
            let todos;
             
            //Retrieve localStorage
            const savedTodos = JSON.parse(localStorage.getItem('todos'));
            //Check if it is an array
            if (Array.isArray(savedTodos)) {
                todos = savedTodos;

            }else {
                todos = [{ 
                title:'Go jogging',
                dueDate:'2022-07-07', id: 'id1'}, {title:'eat',dueDate:'2022-08-07', id: 'id2'}];    

            }

             
            render();
            
            //creating todo
            function createToDo(title, dueDate){
                const id = '' + new Date().getTime(); /*creating an id in javascript that works like a timestamp*/

                todos.push({title: title, dueDate:dueDate, id:id});

            saveTodos();
            }

            //deleting todo
            function removeTodo(idToDelete){
                todos = todos.filter(function (todo) {
                          /*if the id of this todo matches idToDelete, return false.For everything else return true*/
                          if (todo.id === idToDelete) {
                             return false;
                           }
                          else {
                             return true;
                           }
                        })

            } 

            //save to dos
            function saveTodos() {
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            
            //controller section
            function newTodo(){
                const textbox = document.getElementById('todo-title');
                const title = textbox.value;

                const datePicker = document.getElementById('date-picker');
                const dueDate = datePicker.value;

                createToDo(title, dueDate);
                
                document.getElementById('todo-title').value = "";

                render();
            }
            function deleteTodo(event) {
                const deleteButton = event.target;/*accesses the button with the id*/
                const idToDelete = deleteButton.id;
                
                removeTodo(idToDelete);

                        render();

            }
            //view section
            function render() {
                //reset our list
                document.getElementById('todo-list').innerHTML = '';
                // re-render the updated list
                todos.forEach(function (todo) {
                const element = document.createElement('div');
                element.innerText = todo.title + ' - ' +todo.dueDate;

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'remove';
                deleteButton.style = 'margin-left: 13px; background-color: #7c7b6b;';
                deleteButton.onclick = deleteTodo;/*to initiate an event ie when the button is clicked*/ 
                deleteButton.id = todo.id;
                element.appendChild(deleteButton);

                const todoList = document.getElementById('todo-list');
                todoList.appendChild(element);   

            })}
