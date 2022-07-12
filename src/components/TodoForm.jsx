import React,{useState, useEffect, useRef} from 'react'
import '../index.css'
import FinishedTodo from './FinishedTodo'
import Todo from './Todo'

function TodoForm() {

  const [idCount, setIdCount] = useState(1)
  const [todo,setTodo] = useState({
    id:"",
    description:"",
    isActive:false,
    isFinished:false,
  })

  const handleChange = e => {

    setTodo( prevTodo => ({
      ...prevTodo,
      id:idCount,
      description:e.target.value,
    }))
  }
  
  const [todoItems, setTodoItems] = useState([])

  const addTodo = (e) => {

  e.preventDefault()

  if(!todo.description){
    alert("write your todo")
  } else {
    setTodoItems(prevTodo => {
      return [...prevTodo, todo]
    })
  }

  setTodo(prevTodo => ({
    ...prevTodo,
    description: refValue.current
  }))

  setIdCount( prev => {
    return prev + 1
  })

  }
  console.log(idCount)
  useEffect(() => {

    setActiveTodo(prev => {
      return  todoItems.filter( item => item.isActive === true)
    })

    setFinishedTodo(prev => {
      return todoItems.filter ( item => item.isFinished === true)
    })

  },[todoItems])

  const [activeTodo, setActiveTodo] = useState([])
  const [finishedTodo, setFinishedTodo] = useState([])

const clearFinished = () => {

  setTodoItems(prev => {
    return todoItems.filter( item => item.isFinished === false)
  })
}

  const removeTodo = id => {
    setTodoItems(prev => {
      return todoItems.map( (item, i) => {
        return item.id === id ? todoItems.splice(i,1) : item
      })
    })
  }

  const date = new Date()
  const hours = date.getHours()
  const day = date.getDate()
  const minutes = date.getMinutes()
  const month = date.getMonth()
  console.log(month)

  const getTime = () => {
    return {
      day:day,
      month:month + 1,
      year: date.getFullYear()
    }
  }

  console.log(getTime())

  const setActive = id => {

    setTodoItems(prevItems => {
      return prevItems.map( item => {
        return (item.id === id ) ? {...item, isActive: true } : item
      })
    })
  }


  const unsetActive = id => {

    setTodoItems(prevItems => {
      return prevItems.map( item => {
        return (item.id === id ) ? {...item, isActive: false } : item
      })
    })
  }

  const setFinished = id => {
  setTodoItems(prevItems => {
    return prevItems.map( (item, index) => {
      return (item.id === id) ? {...item, isFinished: true , isActive:false, time:getTime()} : item
    })
  })

  }

  

  const populateTodos = todoItems.map( (item,index) => {
    if(!item.isFinished && !item.isActive)
    return ( <Todo key={index} removeTodo={removeTodo} setActive={setActive} data={item} />)
  })

  const populateActive = activeTodo.map( (item,index) => {
    if(item.isActive) {
      return ( <Todo currentActive={true} key={index} setFinished={setFinished} unsetActive={unsetActive} setActive={setActive} data={item} />)
    } 
  })

  const populateFinished = finishedTodo.map( (item,index) => {
    if(item.isFinished) {
      return ( <FinishedTodo  key={index} data={item} />)
    } 
  })


  const refValue = useRef('')
  


  return (
    <div className='todo-form'>
      <div className='form-wrapper'>
        <form onSubmit={addTodo}>
          <label htmlFor="main-todo">Your task</label>
            <input 
            className='todo-input'
            type="text"
            value={todo.description}
            placeholder="Type in your Todo"
            name="main-todo"
            onChange={handleChange}
            />
        </form>
        <button 
        className='add-todo'
        onClick={addTodo}
        >Add Todo</button>
        <hr />

        <div className='todo-list'>
          <h1 className='heading'>Todo's</h1>
          {populateTodos}
        </div>
          </div>

        <div className='focused-todos'>
          <div className='active-todos'>
          <h1>Active Todo's {activeTodo.length} </h1>
          {populateActive}
          </div>
          <hr />
          <div className='finished-todos'>
            <h1>Finished Todos {finishedTodo.length} <button className='add-todo' onClick={clearFinished}>Clear</button></h1>
          {populateFinished}
          </div>
        </div>
    </div>
  )
}

export default TodoForm