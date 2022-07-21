import React,{useState, useEffect, useRef} from 'react'
import '../index.css'
import FinishedTodo from './FinishedTodo'
import Todo from './Todo'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function TodoForm() {

  const [todo,setTodo] = useState({
    id:"",
    description:"",
    isActive:false,
    isFinished:false,
  })
  
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem("todoItems"))
    ||
  []
    )
    
  const [idCount, setIdCount] = useState(
    0
  )


  const handleChange = e => {

    setTodo( prevTodo => ({
      ...prevTodo,
      id:idCount,
      description:e.target.value,
    }))
  }
  

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

  setIdCount(prev => prev + 1)

  }

  useEffect(() => {

    localStorage.setItem("todoItems", JSON.stringify(todoItems))

    setActiveTodo(prev => {
      return  todoItems.filter( item => item.isActive === true)
    })

    setFinishedTodo(prev => {
      return todoItems.filter ( item => item.isFinished === true)
    })

    if(todoItems.length < 1) {setIdCount(1) }

  },[todoItems])

  const [activeTodo, setActiveTodo] = useState([])
  const [finishedTodo, setFinishedTodo] = useState([])
  const [selectedTodo, setSelectedTodo] = useState({})

  const selectTodo = (id) => {
    return todoItems.map( item => {
      return item.id === id ? setSelectedTodo(item) : {}
    })
  }


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
  const day = date.getDate()
  const month = date.getMonth()

  const getTime = () => {
    return {
      day:day,
      month:month + 1,
      year: date.getFullYear()
    }
  }



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
    return ( 
    <Todo
      selectedTodo={selectedTodo}
      selectTodo={selectTodo}
      key={index}
      removeTodo={removeTodo}
      setActive={setActive}
      data={item} />)
  })

  const populateActive = activeTodo.map( (item,index) => {
    if(item.isActive) {
      return ( 
      <Todo
        selectedTodo={selectedTodo}
        selectTodo={selectTodo}
        currentActive={true}
        key={index}
        setFinished={setFinished}
        unsetActive={unsetActive} setActive={setActive} data={item} />)
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
          <Tabs>
            <TabList>
              <Tab>Info</Tab>
              <Tab>Finished</Tab>
            </TabList>
            <TabPanel>
              {selectedTodo && 
              <div className='selected-show'>
                <p>

                  {selectedTodo.description}
                  </p>
                </div>}
            </TabPanel>
            <TabPanel className='finished-todos'>
              <div className=''>
              <button onClick={clearFinished} className='add-todo'>Clear</button>
                {populateFinished}
              </div>
            </TabPanel>
          </Tabs>
        </div>
    </div>
  )
}

export default TodoForm