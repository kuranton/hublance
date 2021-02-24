import {useDispatch} from 'react-redux'

import style from './Join.module.css'

import {hide, start} from './signupSlice'

const Join = () => {
  const dispatch = useDispatch()
  return(
    <>
      <div className={style.photoCell}>
        <div className={style.photoPlaceholder}/>
      </div>
      <h2 className={style.title}>Join to our list!</h2>
      <button className={style.btnJoin} onClick={() => dispatch(start())}>Join Us</button>
      <button className={style.btnClose} onClick={() => dispatch(hide())}>Close</button>
    </>
  )
}


export default Join
