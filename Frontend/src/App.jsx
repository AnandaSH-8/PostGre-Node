import { useState } from 'react'
import CreateTodo from './Components/addTodo'
import TodoList from "./Components/todoList"
import './App.css'

function App() {

  return (
    <>
    <CreateTodo></CreateTodo>
    <TodoList></TodoList>
    </>
  )
}

export default App
