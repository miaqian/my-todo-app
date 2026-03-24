//这个文件从Todo拿数据
//把todo显示出来
//让用户可以新增、删除、勾选完成
//通过这个项目学习到react负责界面和状态，django后端负责村数据
import { useState, useEffect } from 'react'
import './App.css'

function App() { //define a function component the name is App
   // Store all todos fetched from the backend
  const [todos, setTodos] = useState([]) //存储已有的所有todos（一个空的数组）
  // Store the current text inside the input box
  const [input, setInput] = useState('') //存储用户正在输入的文字（每次按键都会更新）
  // Store loading state for the first fetch
  const [time, setTime] = useState('')
  
  useEffect(() => {
    fetch('https://web-production-492b.up.railway.app/api/todos/')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
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
  const sortedTodos = [...todos].sort((a,b) => a.completed - b.completed)
  
  return (

    <div className="world">

      {/* 浮动 emoji */}
      <span className="floaty f1">🌸</span>
      <span className="floaty f2">⭐</span>
      <span className="floaty f3">🦋</span>
      <span className="floaty f4">🌙</span>
      <span className="floaty f5">🍀</span>
      <span className="floaty f6">🌈</span>

      <div className="card">

        {/* 标题区域 */}
        <div className="card-header">
          <span className="crown">👑</span>
          <div className="card-title">Aella's Todo List</div>
          <div className="time-display">{time}</div>
        </div>

        {/* 输入区域 */}
        <div className="input-row">
          <input
            className="todo-input"
            placeholder="Add a new task... ✨"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className="add-btn" onClick={handleAdd}>+ Add</button>
        </div>

        {/* 待办列表 */}
        <ul className="todo-list">
          {sortedTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
              />
              <span className="todo-text">{todo.title}</span>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* 底部装饰点 */}
        <div className="footer-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

      </div>
    </div>
  )
}
export default App
