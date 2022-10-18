export const createStore = (reducer, initialState) => {
  let state = initialState
  const listeners = []

  const getState = () => {
    return state
  }

  const subscribe = (listener) => {
    listeners.push(listener)
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  return {getState, dispatch, subscribe}
}
