//这个文件从Todo拿数据
//把todo显示出来
//让用户可以新增、删除、勾选完成
//通过这个项目学习到react负责界面和状态，django后端负责村数据
import { useState, useEffect } from 'react'
import HabitTracker from './HabitTracker'
import API_BASE from './api'
import './App.css'

function App() {
  // React state only lives in the browser while the page is open.
  // The permanent source of truth is still the Django database.
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [time, setTime] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA')
  )
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // If the user switches to another date, stop editing the old todo row.
  useEffect(() => {
    setEditingId(null)
  }, [selectedDate])

  // Load todos once when the page first opens.
  useEffect(() => {
    fetch(`${API_BASE}/todos/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load todos')
        }
        return res.json()
      })
      .then(data => setTodos(data))
      .catch((err) => {
        console.error('Failed to load todos:', err)
        setTodos([])
      })
  }, [])

  // The clock is pure frontend state and does not involve the backend.
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

    console.log('Add clicked')
    console.log('input:', input)
    console.log('selectedDate:', selectedDate)

    // Send the new todo to Django, then merge the response into local state
    // so the UI updates immediately without a full refetch.
    fetch(`${API_BASE}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input,
        completed: false,
        date: selectedDate
      })
    })
      .then(async (res) => {
        console.log('status:', res.status)

        const data = await res.json()
        console.log('response data:', data)

        if (!res.ok) {
          throw new Error(data.detail || 'Failed to add todo')
        }

        return data
      })
      .then((newTodo) => {
        setTodos([...todos, newTodo])
        setInput('')
      })
      .catch((err) => {
        console.error('Add failed:', err)
        alert('Add failed. Check console.')
      })
  }

  const handleDelete = (id) => {
    fetch(`${API_BASE}/todos/${id}/`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete todo')
        }
        setTodos(todos.filter(todo => todo.id !== id))
      })
      .catch((err) => {
        console.error('Delete failed:', err)
      })
  }
  
  // PATCH only updates one field on an existing todo instead of replacing the whole object.
  const handleToggle = (id, completed) => {
    fetch(`${API_BASE}/todos/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update todo')
      }
      return res.json()
    })
    .then(updatedTodo => {
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    })
    .catch((err) => {
      console.error('Toggle failed:', err)
    })
  }

const handleEdit = (id, newTitle) => {
  fetch(`${API_BASE}/todos/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to edit todo')
      }
      return res.json()
    })
    .then(updatedTodo => {
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
      setEditingId(null)
    })
    .catch((err) => {
      console.error('Edit failed:', err)
    })
}

const formatDate = (year, month, day) => {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2,'0')
  return `${year}-${m}-${d}`
}
const today = new Date().toLocaleDateString('en-CA')

// Build the calendar grid for the visible month.
// Empty cells at the beginning align day 1 with the correct weekday.
const calendarDays = () => {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array(firstDay).fill(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return days
}

const changeMonth = (direction) => {
  let m = currentMonth + direction
  let y = currentYear
  if (m > 11) { m = 0; y++ }
  if (m < 0)  { m = 11; y-- }
  setCurrentMonth(m)
  setCurrentYear(y)
}


  // The backend returns all todos; the calendar decides which day to show.
  const filteredTodos = todos
    .filter(todo => todo.date === selectedDate)
    .sort((a, b) => a.completed - b.completed)


  return (

    <div className="world">

      {/* 浮动 emoji */}
      <span className="floaty f1">🌸</span>
      <span className="floaty f2">⭐</span>
      <span className="floaty f3">🍄</span>
      <span className="floaty f4">🌙</span>
      <span className="floaty f5">🦄</span>
      <span className="floaty f6">🌈</span>
      <span className="floaty f7">❤️</span>
      <span className="floaty f8">🎀</span>
      <span className="floaty f9">🐶</span>

      <div className="card">

        {/* 标题区域 */}
        <div className="card-header">
          <span className="crown">👑</span>
          <div className="card-title">Aella's Todo List</div>
          <div className="time-display">{time}</div>
        </div>

        {/* 日历区域 */}
        {/* 日历区域 */}
        <div className="calendar">
          <div className="cal-header">
            <button className="cal-nav" onClick={() => changeMonth(-1)}>‹</button>
            <span className="cal-title">
              {new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button className="cal-nav" onClick={() => changeMonth(1)}>›</button>
          </div>
          <div className="cal-grid">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="cal-day-name">{d}</div>
            ))}
            {calendarDays().map((day, i) => (
              <div
                key={i}
                className={`cal-day
                  ${day ? '' : 'empty'}
                  ${day && selectedDate === formatDate(currentYear, currentMonth, day) ? 'selected' : ''}
                  ${day && formatDate(currentYear, currentMonth, day) === today ? 'today' : ''}
                `}
                onClick={() => day && setSelectedDate(formatDate(currentYear, currentMonth, day))}
              >
                {day}
              </div>
            ))}
          </div>
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
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
              />
              {editingId === todo.id ? (
                  <input
                    className="todo-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleEdit(todo.id, editText)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEdit(todo.id, editText)}
                    autoFocus
                  />
                ) : (
                  <span
                    className="todo-text"
                    onDoubleClick={() => {
                      setEditingId(todo.id)
                      setEditText(todo.title)
                    }}
                  >
                    {todo.title}
                  </span>
                )}
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Habit Tracker */}
        <HabitTracker selectedDate={selectedDate} />
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
