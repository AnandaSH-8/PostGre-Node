import CreateTodo from './Components/addTodo'
import TodoList from "./Components/todoList"
import './App.css'

function App() {

  return (
    <div className='border border-warning border-2 d-flex'>
    <div className='addTodoBox'>
      <CreateTodo></CreateTodo>
    </div>
    <div>
      <TodoList></TodoList>
    </div>
    </div>
  )
}

export default App
