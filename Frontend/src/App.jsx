import CreateTodo from './Components/addTodo'
import TodoList from "./Components/todoList"
import './App.css'
import DeleteTodo from './Components/deleteTodo'
import { useState } from 'react'
import { Card } from '@chakra-ui/react'

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
    <>
      <Card bgGradient='linear(to-t, lightgreen, white, orange)' 
        display='flex' justifyContent='center'
         height='55'>
        <h2 className='text-primary' >Todo List Site</h2>
      </Card>
      <div className='d-flex p-4'>
        <div className='addTodoBox'>
          <CreateTodo></CreateTodo>
        </div>
        <div>
          <TodoList receiveDelete={recieveDeleteFunc}  getTodoList={getList} setFunc={setGetList}></TodoList>
        </div>
        <DeleteTodo itemId={isDelete} setFunc={setIsDelete} ></DeleteTodo>
      </div>
    </>
  )
}

export default App
