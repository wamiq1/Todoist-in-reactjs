import './App.css';
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState("");

  const [todoList, setTodoList] = useState([]);

  const [btnText, setBtnText] = useState("Add");

  const [updateFlag, setUpdateFlag] = useState(null);

  const [isComplete, setIsComplete] = useState(null)

  const [isDisabled, setIsDisabled] = useState(false)

  const addItem = () => {

    if (updateFlag !== null) {
      return updateItem()
    }
    setTodoList(prev=>[...prev,inputValue])
    setInputValue("")
  }
  const deleteItem = (indexValue) => {
    todoList.splice(indexValue, 1);
    setTodoList(prev=>[...prev]);
  }

  const editItem = (item, indexValue) => {
    setInputValue(item);
    setBtnText("Update");
    setUpdateFlag(indexValue);
    setIsDisabled(true);
  }

  const updateItem = () => {
    setInputValue(updateFlag)
    todoList.splice(updateFlag, 1, inputValue);
    setBtnText("Add");
    setUpdateFlag(null)
    setIsDisabled(false);
    setInputValue("")
  }

  const updateStatus = (indexValue) => {
    setIsComplete(indexValue);
    setIsDisabled(true);
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
          return <li key={item} 
                    style={updateFlag === index ? {background: 'white'} : {}}>
                      <span style={isComplete === index ? {textDecoration: 'line-through'} : {}}>{item}</span> 
                    <button onClick={() => updateStatus(index)} 
                            disabled={isDisabled || updateFlag === index} 
                            style={(isDisabled && updateFlag === index) ? {background: '#c414fda1', border: '#c414fda1'} : {}}>Complete
                    </button>
                    <button onClick={() => editItem(item, index)}>Edit
                    </button>
                    <button onClick={() => deleteItem(index)}
                            disabled={isDisabled && updateFlag === index} 
                            style={(isDisabled && updateFlag === index) ? {background: '#c414fda1', border: '#c414fda1'} : {}}>Delete
                    </button>
                  </li> 
        })}
        </ul>
      </div>
  );
}

export default App;
