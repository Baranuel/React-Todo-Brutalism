import React from 'react'

function FinishedTodo(props) {
  const {data} = props
  const {time} = data
  console.log( time )

return (
  <div className='todo finished-todo'  >
      <div className='todo-desc'>
      <h2 className='todo-number'>#{data.id}</h2>
      <h2>{data.description}</h2>
      </div>
      <div className='time'>
        <h3>time</h3>
        <span>{time.day}/</span>  <span>{time.month}/</span> <span>{time.year}</span>
      </div>
  </div>
)
}

export default FinishedTodo