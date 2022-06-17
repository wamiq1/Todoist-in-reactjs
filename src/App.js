import './App.css';
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState("")

  const [todoList, setTodoList] = useState([])

  const [btnText, setBtnText] = useState("Add")

  const [updateFlag, setUpdateFlag] = useState(null)

  const addItem = () => {

    if (updateFlag !== null) {
      return updateItem()
    }
    setTodoList(prev=>[...prev,inputValue])
    setInputValue("")
  }
  const deleteItem = (indexValue) => {
    todoList.splice(indexValue, 1);
    setTodoList(prev=>[...prev])
  }

  const editItem = (item, indexValue) => {
    setInputValue(item)
    setBtnText("Update")
    setUpdateFlag(indexValue)
  }

  const updateItem = () => {
    setInputValue(updateFlag)
    todoList.splice(updateFlag, 1, inputValue);
    setBtnText("Add");
    setUpdateFlag(null)
    setInputValue("")
  }
  return (
      <div className="main-container">
        <h1>Todo In React</h1>
        <div className="input-field">
          <input type="text" value={inputValue} placeholder="Add Item" onChange={e => setInputValue(e.target.value)}/>
          <button type="button" onClick={addItem}>{btnText}</button>
        </div>
        <ul>
        {todoList.map((item, index) => {
          return <li key={item}>{item} <button type='button' onClick={() => editItem(item, index)}>Edit</button><button type='button' onClick={() => deleteItem(index)}>Delete</button></li> 
        })}
        </ul>
      </div>
  );
}

export default App;
