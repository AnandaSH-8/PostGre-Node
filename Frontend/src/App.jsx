import CreateTodo from './Components/addTodo'
import TodoList from "./Components/todoList"
import './App.css'
import DeleteTodo from './Components/deleteTodo'
import { useState } from 'react'

function App() {

  const [isDelete,setIsDelete] = useState(false);

  function recieveDeleteFunc(value){
    setIsDelete(value)
  }

  return (
      <div className='d-flex'>
        <div className='addTodoBox'>
          <CreateTodo></CreateTodo>
        </div>
        <div>
          <TodoList receiveDelete={recieveDeleteFunc}></TodoList>
        </div>
        <DeleteTodo itemId={isDelete} setFunc={setIsDelete} ></DeleteTodo>
      </div>
  )
}

export default App
