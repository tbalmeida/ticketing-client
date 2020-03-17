import React, {useReducer} from 'react'
import {AlertContext} from './alertContext'
import {alertReducer} from './alertReducer'
import {HIDE_ALERT, SHOW_ALERT} from '../types' //just name of commands for alerts

export const AlertState = ({children}) => {
  const [state, dispatch] = useReducer(alertReducer, {visible: false})//use reducer to change the state of alert visible:false is an initial state

  const show = (text, type = 'warning') => { //type is for bootstrap
    dispatch({
      type: SHOW_ALERT,
      payload: {text, type} 
    })
  }

  const hide = () => dispatch({type: HIDE_ALERT})

  return (
    <AlertContext.Provider value={{  //we use .Provide to use that context and then we pass methods(props) to work with state.
      show, hide, //here we have show: show, hide: hide etch
      alert: state //we call it alert butt it's state
    }}>
      { {children} } 
       {/* formality you pass all thouse functions */}
    </AlertContext.Provider>
  )
}