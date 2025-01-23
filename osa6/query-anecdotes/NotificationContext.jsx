/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return 'too short anecdote, must have length 5 or more'
    case 'CREATE':
      return `anecdote ${action.payload}`
    case 'VOTE':
      return `voted ${action.payload.content}`
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const useNotificationText = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch [1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value ={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext