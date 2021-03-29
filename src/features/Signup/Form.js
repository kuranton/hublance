import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setName, setJob, setEmail} from '@store/profileSlice'
import {submit} from '@store/signupSlice'

import style from './Form.module.css'

import {isEmail} from 'validator'

import Step from './Step'

import step1 from './assets/step1.svg'
import step2 from './assets/step2.svg'
import step3 from './assets/step3.svg'
import complete from './assets/complete.svg'

const imgs = {step1, step2, step3, complete}

const Form = () => {
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const name = useSelector(store => store.profile.name)
  const job = useSelector(store => store.profile.job)
  const email = useSelector(store => store.profile.email)
  const submitted = useSelector(store => store.signup.submitted)

  const preventOutline = (e) => e.preventDefault()

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Join the hub!</h2>

      {!submitted ? <>
        <div className={style.imgWrap}>
          <img src={imgs[`step${step+1}`]} alt={`Step ${step}`}/>
        </div>
        {step === 0 ?
          <Step
            visible={step === 0}
            backDisabled={true}
            goForward={() => setStep(step + 1)}
            title='Name'
            validator={(value) => !!value}
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
        : null}
        {step === 1 ?
          <Step
            visible={step === 1}
            goBack={() => setStep(step-1)}
            goForward={() => setStep(step + 1)}
            title='Job Title'
            validator={(value) => !!value}
            value={job}
            onChange={(e) => dispatch(setJob(e.target.value))}
          />
        : null}
        {step === 2 ?
          <Step
            visible={step === 2}
            type='email'
            goBack={() => setStep(step-1)}
            goForward={() => dispatch(submit())}
            title='Email'
            validator={(value) => isEmail(value)}
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        : null}
      </>

      : <>
        <img src={imgs.complete} alt={`Step ${step}`}/>
        <h3 className={style.congrats}>Congratulations!</h3>
        <h3 className={style.message}>You are in HubLance!</h3>
        <button className={style.btnProfile} onMouseDown={preventOutline}>See your profile</button>
      </>}

    </div>
  )
}

export default Form
