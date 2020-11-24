import React, { useState } from "react";
import {RiCloseCircleLine} from "react-icons/ri";
import {TiEdit} from "react-icons/ti";
import TodoForm from "./TodoForm"

function Todo({ todos, completeTodo, removeTodo, updateTodo}) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  //This will update of the todo. Once it does that it will reset the id and value back to null
  const submitUpdate = value => {

      updateTodo(edit.id, value)
      setEdit({
          id:null,
          value: ''
      })
  };
 
  //When the user clickes edit it will get update the todo with the id and the new value.
  if(edit.id){
      return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  //todo is the array from TodoList and index is just how many there are
  return todos.map((todo, index) => (
      
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine 
        onClick={() => removeTodo(todo.id)}
        className='delete-icon'
        />
        <TiEdit 
        onClick ={() => setEdit ({id: todo.id, value:todo.text})}
        className='edit-icon'
        />
      </div>
    </div>
  ));
}

export default Todo;
