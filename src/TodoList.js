
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Stack, Dropdown, DropdownButton } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react';

function TodoList(todos) {

  const todoInput = useRef()
  const [dropdownTitle, setDropdownTitle] = useState("Select status")
  const [dataList, setDataList] = useState([])
  const [updateData, setUpdateData] = useState(null)


  useEffect(() => {
    setDataList(todos.todos)

  }, [])


  // To make changes in todo
  const addTodo = async () => {
    if (todoInput.current.value.length <= 0) {
      toast.error('todo can not be empty !', {
        position: toast.POSITION.TOP_RIGHT
      });
      return
    } else if (dropdownTitle === "Select status") {
      toast.error('Please select todo status !', {
        position: toast.POSITION.TOP_RIGHT
      });
      return

    }


    // To add todo
    if (!updateData) {
      const id = toast.loading("Please wait...")
      const response = fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: todoInput.current.value,
          completed: dropdownTitle === "Completed" ? true : false,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const result = await response
      const final = await result.json()

      if (final) {
        toast.update(id, { render: `${final.title} - todo added sucessfully!`, type: "success", isLoading: false, autoClose: 3000 });
      } else {
        toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 3000 });
      }

    } else {
      // To delete todo
      const id = toast.loading("Please wait...")
      const response = fetch(`https://jsonplaceholder.typicode.com/todos/${updateData}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: todoInput.current.value,
          completed: dropdownTitle === "Completed" ? true : false,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const result = await response
      const final = await result.json()

      if (final) {
        toast.update(id, { render: `${final.title} - todo updated sucessfully!`, type: "success", isLoading: false, autoClose: 3000 });
      } else {
        toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 3000 });
      }
      setUpdateData(null)

    }

    setDropdownTitle("Select status")
    document.getElementById("todo").value = ""
  }

  // To observe todo field changes
  const todoChange = (e) => {
    todoInput.current.value = e.target.value
  }

  // To reset form
  const resetForm = () => {
    setDropdownTitle("Select status")
    document.getElementById("todo").value = ""
  }


  // To delete todo
  const deleteTodo = (e) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.id}`, {
      method: 'DELETE',
    });

    toast.success(`todo deleted sucessfully!`, {
      position: toast.POSITION.TOP_RIGHT
    });

  }

  // To uodate todo
  const updateTodo = (e) => {
    const obj = dataList.filter((element) => {
      if (+e.target.id === element.id) {
        return element
      }
    })

    setUpdateData(obj[0]?.id)
    setDropdownTitle(obj[0]?.completed ? "Completed" : "Not Completed")
    document.getElementById("todo").value = obj[0]?.title

  }


  return (
    <div style={{ width: "50%", marginLeft: "20%" }}>
      <Stack direction="horizontal" gap={3} style={{ padding: "10px" }}>
        <Form.Control className="me-auto" ref={todoInput} onChange={todoChange} id="todo" placeholder="Add your todo here..." />
        <DropdownButton variant="success" id="dropdown-basic-button" title={dropdownTitle}>
          <Dropdown.Item onClick={() => setDropdownTitle("Completed")} >Completed</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle("Not Completed")} >Not Completed</Dropdown.Item>
        </DropdownButton>


        <Button variant="secondary" onClick={addTodo}>Submit</Button>
        <div className="vr" />
        <Button variant="outline-danger" onClick={resetForm}>Reset</Button>
      </Stack>

      <Container>
        <Stack gap={3}>
          {dataList && dataList.map((item, i) => (
            <div className="border p-2" style={{ backgroundColor: "skyblue", borderRadius: "5px" }} id={item.id}>
              <p>{item.title} - {item.completed ? "Completed" : "Not Completed"}</p>
              <Button variant="secondary" style={{ marginLeft: "5px" }} id={item.id} onClick={updateTodo}>Update</Button>
              <Button variant="danger" style={{ marginLeft: "5px" }} id={item.id} onClick={deleteTodo}>Delete</Button>

            </div>
          ))}
        </Stack>

      </Container>

      <ToastContainer />

    </div>
  );
}

export default TodoList;
