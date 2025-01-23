import { useNotificationText } from '../../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const notification = useNotificationText()

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
  
}

export default Notification
