import { useState } from 'react'
function App() {
  const [todos, setTodos] = useState([]) //存储已有的所有todos（一个空的数组）
  const [input, setInput] = useState('') //存储用户正在输入的文字（每次按键都会更新）
  
  const handleAdd = () => {
    if (input.trim() === '') {
        alert('Please enter a todo')
        return 
      }
      setTodos([...todos, input])
      setInput('')
  }

  function handleDelete(index) {
    setTodos(todos.filter(function(_, i) {
      return i !== index
    }))
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
        {todos.map((todo,index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App