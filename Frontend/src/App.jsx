import CreateTodo from './Components/addTodo'
import TodoList from "./Components/todoList"
import './App.css'
import DeleteTodo from './Components/deleteTodo'
import { useState } from 'react'

function App() {

  const [isDelete,setIsDelete] = useState(0);
  const [getList, setGetList] = useState(false)

  function recieveDeleteFunc(value){
    setIsDelete(value)
  }

  if(isDelete == -8){
    setIsDelete(0);
    setGetList(true)
  }

  return (
      <div className='d-flex'>
        <div className='addTodoBox'>
          <CreateTodo></CreateTodo>
        </div>
        <div>
          <TodoList receiveDelete={recieveDeleteFunc}  getTodoList={getList} setFunc={setGetList}></TodoList>
        </div>
        <DeleteTodo itemId={isDelete} setFunc={setIsDelete} ></DeleteTodo>
      </div>
  )
}

export default App
