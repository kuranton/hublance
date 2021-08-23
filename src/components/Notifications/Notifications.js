import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {removeNotification} from '@store/notificationsSlice'
import style from './Notifications.module.css'

const Notifications = () => {
  const notifications = useSelector(store => store.notifications)

  return(
    <div className={style.wrap}>
      {notifications.map((notification, index) =>
        <Single key={notification.id} data={notification} index={index}/>
      )}
    </div>
  )
}

const Single = ({data, index}) => {
  const [fading, setFading] = useState(false)
  const dispatch = useDispatch()

  const handleAnimationEnd = () => {
    if (fading) {
      dispatch(removeNotification(data.id))
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setFading(true), 5000)
    return () => clearTimeout(timeout)
  }, [])

  return(
    <div className={style.notificationWrap} style={{transform: `translateY(${index * 82}px)`}}>
      <div
        className={`${style.notification} ${style[data.type]}`}
        style={{animationName: fading ? style.disappear : style.appear}}
        onAnimationEnd={handleAnimationEnd}
      >
        {data.text}
        <button type='button' className={style.close} onClick={() => setFading(true)}>Close</button>
      </div>
    </div>
  )
}

export default Notifications
