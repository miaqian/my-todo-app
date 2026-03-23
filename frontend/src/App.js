//这个文件从Todo拿数据
//把todo显示出来
//让用户可以新增、删除、勾选完成
//通过这个项目学习到react负责界面和状态，django后端负责村数据
import { useState, useEffect } from 'react'

function App() { //define a function component the name is App
   // Store all todos fetched from the backend
  const [todos, setTodos] = useState([]) //存储已有的所有todos（一个空的数组）
  // Store the current text inside the input box
  const [input, setInput] = useState('') //存储用户正在输入的文字（每次按键都会更新）
  // Store loading state for the first fetch
  
  useEffect(() => {
    fetch('https://web-production-492b.up.railway.app/api/todos/')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])


  const handleAdd = () => {
    if (input.trim() === '') {
        alert('Please enter a todo')
        return 
      }
      fetch('https://web-production-492b.up.railway.app/api/todos/', {
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
    fetch(`https://web-production-492b.up.railway.app/api/todos/${id}/`, {
      method: 'DELETE'
    })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    //if delete a list 
    //remove a list and it's index
  }
  
  const handleToggle = (id, completed) => {
    fetch(`https://web-production-492b.up.railway.app/api/todos/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    .then(res => res.json())
    .then(updatedTodo => {
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    })
  }
  return (
    <div>
      <h1>Aella's Todo List</h1>
      <input 
        value ={input} 
        onChange={(e)=> setInput(e.target.value)}/> 
        <button onClick={handleAdd}> Add Todo </button> 
      <ul>
        {[...todos]
          .sort((a, b) => a.completed - b.completed)
          .map((todo) =>(
          <li key={todo.id} style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'gray' : 'black'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id, todo.completed)}
              />
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App
