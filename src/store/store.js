import {legacy_createStore} from 'redux'
import reducer from './tasks'

const initialState = [
  {id: 1, title: 'Task 1', completed: false},
  {id: 2, title: 'Task 2', completed: false}
]

const configureStore = () => {
  return legacy_createStore(reducer, initialState)
}

export default configureStore
