import {createAction, createSlice} from '@reduxjs/toolkit'
import todosService from '../services/todosService'
import {setError} from './errors'

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter((t) => t.id !== action.payload.id)
    },
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    loadTasksRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state) {
      state.isLoading = false
    },
    taskAdded(state, action) {
      state.entities.push(action.payload)
    }
  }
})

const {actions, reducer: taskReducer} = taskSlice
const {
  update,
  remove,
  received,
  loadTasksRequested,
  taskRequestFailed,
  taskAdded
} = actions
const taskRequested = createAction('task/requested')

export const loadTasks = () => async (dispatch, getState) => {
  dispatch(loadTasksRequested())
  try {
    const data = await todosService.fetch()
    dispatch(received(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({id, completed: true}))
}

export const titleChanged = (id) => {
  return update({id, title: `New title for ${id}`})
}

export const taskDeleted = (id) => {
  return remove({id})
}

export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.create(task)
    dispatch(taskAdded(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
