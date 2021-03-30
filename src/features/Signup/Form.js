import {useState} from 'react'
import {useDispatch} from 'react-redux'

import {edit} from '@store/profileSlice'

import style from './Form.module.css'

import Line from './Line'
import Squares from './Squares'
import Steps from './Steps'

const Form = () => {
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()

  const preventOutline = (e) => e.preventDefault()

  return(
    <div className={style.wrap}>
      <h2 className={`${style.title} ${step > 2 ? style.fadeOut : ''}`}>Join the hub!</h2>

      <div className={style.imgWrap}>
        <Squares complete={step > 2}/>
        <Line step={step}/>
      </div>
      <Steps
        step={step}
        setStep={setStep}
      />
      {step > 2 ?
        <div className={style.congratsWrap} style={{animation: `500ms ${style.fadeIn} forwards`, animationDelay: '500ms'}}>
          <h3 className={style.congrats}>Congratulations!</h3>
          <h3 className={style.message}>You are in HubLance!</h3>
          <button className={style.btnProfile} onMouseDown={preventOutline} onClick={() => dispatch(edit())}>See your profile</button>
        </div>
      : null}

    </div>
  )
}

export default Form
