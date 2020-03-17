import {HIDE_ALERT, SHOW_ALERT} from '../types' //function that is telling states what to do and how to change

const handlers = {
  [SHOW_ALERT]: (state, {payload}) => ({...payload, visible: true}), //payload is just your text like 'loading', 'saving' etc it's not clear why it's in square brackets
  [HIDE_ALERT]: state => ({...state, visible: false}),
  DEFAULT: state => state //doesn't change the state
}

export const alertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT //defines which action to take when need to change state or leave it by default
  return handle(state, action)
}