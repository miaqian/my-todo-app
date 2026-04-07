import { useState, useEffect } from 'react'

const API = 'https://web-production-492b.up.railway.app/api'

function HabitTracker({ selectedDate }) {
  const [habits, setHabits] = useState([])        // 所有习惯
  const [logs, setLogs] = useState([])            // 今天的打卡记录
  const [input, setInput] = useState('')          // 新习惯输入框

  // 页面加载时获取所有习惯和今天的打卡记录
  useEffect(() => {
    fetch(`${API}/habits/`)
      .then(res => res.json())
      .then(data => setHabits(data))

    fetch(`${API}/habitlogs/?date=${selectedDate}`)
      .then(res => res.json())
      .then(data => setLogs(data))
  }, [selectedDate])

  // 添加新习惯
  const handleAddHabit = () => {
    if (input.trim() === '') return
    fetch(`${API}/habits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    })
      .then(res => res.json())
      .then(newHabit => {
        setHabits([...habits, newHabit])
        setInput('')
      })
  }

  // 打卡 / 取消打卡
  const handleToggleLog = (habitId) => {
    const existing = logs.find(log => log.habit === habitId)
    if (existing) {
      // 已打卡 → 取消
      fetch(`${API}/habitlogs/${existing.id}/`, { method: 'DELETE' })
        .then(() => setLogs(logs.filter(log => log.id !== existing.id)))
    } else {
      // 未打卡 → 打卡
      fetch(`${API}/habitlogs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habit: habitId, date: selectedDate })
      })
        .then(res => res.json())
        .then(newLog => setLogs([...logs, newLog]))
    }
  }

  // 删除习惯
  const handleDeleteHabit = (id) => {
    fetch(`${API}/habits/${id}/`, { method: 'DELETE' })
      .then(() => setHabits(habits.filter(h => h.id !== id)))
  }

  return (
    <div className="habit-section">
      <div className="habit-title">🌱 Habit Tracker</div>

      {/* 添加习惯 */}
      <div className="input-row">
        <input
          className="todo-input"
          placeholder="Add a new habit... ✨"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
        />
        <button className="add-btn" onClick={handleAddHabit}>+ Add</button>
      </div>

      {/* 习惯列表 */}
      <ul className="todo-list">
        {habits.map(habit => {
          const done = logs.some(log => log.habit === habit.id) // 今天有没有打卡
          return (
            <li key={habit.id} className={`todo-item ${done ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={done}
                onChange={() => handleToggleLog(habit.id)}
              />
              <span className="todo-text">{habit.name}</span>
              <button className="delete-btn" onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HabitTracker