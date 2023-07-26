import { useState,useEffect } from "react";
import TodoList from "./TodoList" 
import 'bootstrap/dist/css/bootstrap.css';

function App() {


  const [todos,setTodos] = useState();

  const fetchTodo= async()=>{
    const response = fetch(
      "https://jsonplaceholder.typicode.com/todos")
                  
      const result = await response
      const final = await result.json()

    setTodos(final)
  
  }

  useEffect(()=>{
    fetchTodo()
    

  },[])


    






  return (
    <div className="App">
      {todos && <TodoList todos = {todos}/>}
    </div>
  );
}

export default App;
