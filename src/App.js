import { useState, useEffect } from "react";
import TodoList from "./TodoList"
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  // To store todos
  const [todos, setTodos] = useState();

  // fetching todo list
  const fetchTodo = async () => {
    const response = fetch(
      "https://jsonplaceholder.typicode.com/todos")

    const result = await response
    const final = await result.json()

    setTodos(final)

  }

  useEffect(() => {
    fetchTodo()


  }, [])




  return (
    <div className="App">
      {/* rendering TodoList component */}
      {todos && <TodoList todos={todos} />}
    </div>
  );
}

export default App;
