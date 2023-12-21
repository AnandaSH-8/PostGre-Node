import CreateTodo from './Components/addTodo'
import TodoList from "./Components/todoList"
import './App.css'
import EditTodo from './Components/editTodo'
import DeleteTodo from './Components/deleteTodo'

function App() {

  return (
      <div className='d-flex'>
        <div className='addTodoBox'>
          <CreateTodo></CreateTodo>
        </div>
        <div>
          <TodoList></TodoList>
        </div>
        <EditTodo></EditTodo>
        <DeleteTodo></DeleteTodo>
      </div>
  )
}

export default App
