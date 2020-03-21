 
import React, {useContext} from 'react' //useContext is used for providing any content everywhere
import {CSSTransition} from 'react-transition-group' // this is an animation was found somewhere on the Internet
import {AlertContext} from './context/alert/alertContext'

export const Alert = () => {
  const {alert, hide} = useContext(AlertContext) //alert is a state in fact

  return (
    <CSSTransition //react part it's like a container
      in={alert.visible}  //state.visible uses boolean value
      timeout={{
        enter: 500,
        exit: 350
      }}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
        <strong>Oops!</strong>
        &nbsp;{alert.text}
        <button 
        onClick={hide} 
        type="button" className="close" aria-label="Close"> 
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </CSSTransition>
  )
}