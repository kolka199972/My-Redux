import {combineReducers, configureStore} from '@reduxjs/toolkit'
import errorReducer from './errors'
import {logger} from './middleware/logger'
import taskReducer from './tasks'

const rootReducer = combineReducers({tasks: taskReducer, errors: errorReducer})

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
  })
}

export default createStore
