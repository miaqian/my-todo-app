import { useState, useEffect } from 'react'
import API from './api'

// Returns a date string YYYY-MM-DD offset by `days` from the given date string
const addDays = (dateStr, days) => {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d + days)
  return date.toLocaleDateString('en-CA')
}

function HabitTracker({ selectedDate }) {
  const [habits, setHabits] = useState([])
  const [logs, setLogs] = useState([])       // today's logs
  const [history, setHistory] = useState([]) // last 60 days logs for streak + dots
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(`${API}/habits/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load habits')
        return res.json()
      })
      .then(data => setHabits(data))
      .catch((err) => {
        console.error('Failed to load habits:', err)
        setHabits([])
      })

    fetch(`${API}/habitlogs/?date=${selectedDate}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load habit logs')
        return res.json()
      })
      .then(data => setLogs(data))
      .catch((err) => {
        console.error('Failed to load habit logs:', err)
        setLogs([])
      })

    const dateFrom = addDays(selectedDate, -59)
    fetch(`${API}/habitlogs/?date_from=${dateFrom}&date_to=${selectedDate}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load habit history')
        return res.json()
      })
      .then(data => setHistory(data))
      .catch((err) => {
        console.error('Failed to load habit history:', err)
        setHistory([])
      })
  }, [selectedDate])

  const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - 6))
  }

  const getStreak = (habitId) => {
    let streak = 0
    let cursor = selectedDate
    while (true) {
      const hasLog = history.some(log => log.habit === habitId && log.date === cursor)
      if (!hasLog) break
      streak++
      cursor = addDays(cursor, -1)
    }
    return streak
  }

  const handleAddHabit = () => {
    if (input.trim() === '') return
    fetch(`${API}/habits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add habit')
        return res.json()
      })
      .then(newHabit => {
        setHabits([...habits, newHabit])
        setInput('')
      })
      .catch((err) => console.error('Add habit failed:', err))
  }

  const handleToggleLog = (habitId) => {
    const existing = logs.find(log => log.habit === habitId)
    if (existing) {
      fetch(`${API}/habitlogs/${existing.id}/`, { method: 'DELETE' })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to delete habit log')
          setLogs(logs.filter(log => log.id !== existing.id))
          setHistory(history.filter(log => log.id !== existing.id))
        })
        .catch((err) => console.error('Delete habit log failed:', err))
    } else {
      fetch(`${API}/habitlogs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habit: habitId, date: selectedDate })
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to create habit log')
          return res.json()
        })
        .then(newLog => {
          setLogs([...logs, newLog])
          setHistory([...history, newLog])
        })
        .catch((err) => console.error('Create habit log failed:', err))
    }
  }

  const handleDeleteHabit = (id) => {
    fetch(`${API}/habits/${id}/`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete habit')
        setHabits(habits.filter(h => h.id !== id))
      })
      .catch((err) => console.error('Delete habit failed:', err))
  }

  const last7Days = getLast7Days()

  return (
    <div className="habit-section">
      <div className="habit-title">🌱 Habit Tracker</div>

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

      <ul className="todo-list">
        {habits.map(habit => {
          const done = logs.some(log => log.habit === habit.id)
          const streak = getStreak(habit.id)
          return (
            <li key={habit.id} className={`todo-item habit-item ${done ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={done}
                onChange={() => handleToggleLog(habit.id)}
              />
              <div className="habit-info">
                <span className="todo-text">{habit.name}</span>
                <div className="habit-history">
                  <div className="habit-dots">
                    {last7Days.map(day => {
                      const checked = history.some(log => log.habit === habit.id && log.date === day)
                      return (
                        <span
                          key={day}
                          className={`habit-dot ${checked ? 'checked' : ''}`}
                          title={day}
                        />
                      )
                    })}
                  </div>
                  {streak > 0 && (
                    <span className="habit-streak">🔥 {streak} day{streak > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HabitTracker
