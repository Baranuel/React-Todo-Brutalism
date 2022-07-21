import React from 'react'

function Todo(props) {

    const {data, selectedTodo, selectTodo, setActive,removeTodo,  unsetActive, currentActive, setFinished} = props
    
    return (
    <div onClick={() => {selectTodo(data.id)}} className={`todo ${selectedTodo.id === data.id ? 'selectedTodo' : ''}`}>
        <div className='todo-desc'>
        <h2 className='todo-number'>#{data.id}</h2>
        {data.description.length > 25 
        ? <h2>{data.description.slice(0,15)}...</h2>
        : <h2>{data.description}</h2>
      }
        </div>
        {currentActive ?
              <div className='buttons-div-active'>
                  <button onClick={ () => {setFinished(data.id)}} className='todo-button' id ="y">Finish</button>
                  <button onClick={() => unsetActive(data.id)} className='todo-button' id ="x">X</button>
              </div>
                      :   
              <div className='buttons-div'>
                  <button onClick={() => setActive(data.id)} className='todo-button' id ="y">make active</button>
                  <button onClick={() => removeTodo(data.id)} className='todo-button' id ="x">delete</button>
              </div>
        }

    </div>
  )
}


export default Todo