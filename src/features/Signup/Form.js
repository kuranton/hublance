import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {edit} from '@store/profileSlice'

import style from './Form.module.css'

import Line from './Line'
import Squares from './Squares'
import Steps from './Steps'

const Form = () => {
  const [fading, setFading] = useState(false)
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const authenticated = useSelector(store => store.auth.authenticated)
  const error = useSelector(store => store.auth.errors.signup)

  const preventOutline = (e) => e.preventDefault()

  const handleAnimationEnd = () => {
    if (fading) {
      dispatch(edit())
    }
  }

  return(
    <li className={style.wrap} style={{animationName: fading ? style.disappear : style.appear}} onAnimationEnd={handleAnimationEnd}>
      <h2 className={`${style.title} ${step > 2 ? style.fadeOut : ''}`}>Join the hub!</h2>

      <div className={style.imgWrap}>
        <Squares complete={step > 2}/>
        <Line step={step}/>
      </div>
      <Steps
        step={step}
        setStep={setStep}
        signedUp={authenticated}
      />
      {authenticated ?
        <div className={style.congratsWrap} style={{animation: `500ms ${style.fadeIn} forwards`, animationDelay: '500ms'}}>
          <h3 className={style.congrats}>Congratulations!</h3>
          <h3 className={style.message}>You are in HubLance!</h3>
          <button className={style.btnProfile} onMouseDown={preventOutline} onClick={() => setFading(true)}>See your profile</button>
        </div>
      : null}

      {error &&
        <p className={style.error}>{error}</p>
      }
    </li>
  )
}

export default Form
