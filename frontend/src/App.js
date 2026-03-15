import { useState, useEffect } from 'react'

function App() {
   // Store all todos fetched from the backend
  const [todos, setTodos] = useState([]) //存储已有的所有todos（一个空的数组）
  // Store the current text inside the input box
  const [input, setInput] = useState('') //存储用户正在输入的文字（每次按键都会更新）
  // Store loading state for the first fetch
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/todos/')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])


  const handleAdd = () => {
    if (input.trim() === '') {
        alert('Please enter a todo')
        return 
      }
      fetch('http://127.0.0.1:8000/api/todos/', {
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({ title:input,completed: false })
      })
        .then(res => res.json())
        .then(newTodo => {
          setTodos([...todos, newTodo])
          setInput('')
        })
  }

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: 'DELETE'
    })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    //if delete a list 
    //remove a list and it's index
  }
  
  return (
    <div>
      <h1>Todo App</h1>
      <input 
        value ={input} 
        onChange={(e)=> setInput(e.target.value)}/> 
        <button onClick={handleAdd}> Add Todo </button> 
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App