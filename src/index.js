import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {getError} from './store/errors'
import createStore from './store/store'
import {
  completeTask,
  createTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  taskDeleted,
  titleChanged
} from './store/tasks'

const store = createStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  const addNewTask = () => {
    dispatch(createTask({userId: 1, title: 'Some new task', completed: false}))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <h1>App</h1>
      <button onClick={addNewTask}>Add Task!!!</button>
      <hr />
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button
              style={{background: 'red', color: 'white', marginLeft: '20px'}}
              onClick={() => deleteTask(el.id)}
            >
              Delete task
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
