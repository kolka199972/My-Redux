import {createSlice} from '@reduxjs/toolkit'
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
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state) {
      state.isLoading = false
    },
    create(state, action) {
      state.entities.push(action.payload)
    }
  }
})

const {actions, reducer: taskReducer} = taskSlice
const {update, remove, received, taskRequested, taskRequestFailed, create} =
  actions

export const loadTasks = () => async (dispatch, getState) => {
  dispatch(taskRequested())
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

export const createTask = () => async (dispatch) => {
  try {
    const content = {
      title: `New titlle`,
      completed: false
    }
    const data = await todosService.create(content)
    dispatch(create(data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
