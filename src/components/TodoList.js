import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  //todos is an array of all the values and ID's
  const [todos, setTodos] = useState([]);

  //This will add the todo which consists of ID and the value into the aray todos
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    console.log(newTodos);
    setTodos(newTodos);
  };

  //This will filter out a specific index in the array by checking if the ID's are the same
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  //By taking the ID and the new value that the user input. It will map through the array, once it finds the ID, it will change the new value
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  //Once the todo is clicked to be completed it will get the ID and complete the certain todo
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    console.log("hi");
    setTodos(updatedTodos);
  };

  //This will fetch the api and get the jokes. Once it does it will push them into the array todos and display it.
  useEffect(async () => {
    let newTodos = [];
    let set = [];
    let test = [];
    for (let i = 0; i < 3; i++) {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random?category=dev"
      );
      const data = await response.json();
      const joke = data.value;
      const jokeID = data.id;

      set = {
        id: jokeID,
        text: joke,
      };
      newTodos.push(set);
    }

    test = set;
    setTodos(newTodos);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
