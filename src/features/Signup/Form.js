import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import style from './Form.module.css'

import {isEmail} from 'validator'

import {setName, setJob, setEmail, submit} from './signupSlice'

import step1 from './step1.svg'
import step2 from './step2.svg'
import step3 from './step3.svg'
import complete from './complete.svg'

const imgs = {step1, step2, step3, complete}

const Form = () => {
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const name = useSelector(store => store.signup.name)
  const job = useSelector(store => store.signup.job)
  const email = useSelector(store => store.signup.email)
  const submitted = useSelector(store => store.signup.submitted)

  const steps = [
    <>
      <label htmlFor='name' className={style.label}>
        Name
      </label>
      <input type='text' name='name' placeholder='Type here...' onChange={(e) => dispatch(setName(e.target.value))} value={name} className={style.input}/>
    </>,
    <div>
      <label htmlFor='job-title' className={style.label}>
        Job Title
      </label>
      <input type='text' name='job-title' placeholder='Type here...' onChange={(e) => dispatch(setJob(e.target.value))} value={job} className={style.input}/>
    </div>,
    <div>
      <label htmlFor='email' className={style.label}>
        Email
      </label>
      <input type='email' name='email' placeholder='Type here...' onChange={(e) => dispatch(setEmail(e.target.value))} value={email} className={style.input}/>
    </div>
  ]

  const preventOutline = (e) => e.preventDefault()

  const nextDisabled = (step >= steps.length) || (step === 2 && !isEmail(email))

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      dispatch(submit())
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleNext()
  }

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Join the hub!</h2>

      {!submitted ? <>
        <div className={style.imgWrap}>
          <img src={imgs[`step${step+1}`]} alt={`Step ${step}`}/>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <button type='button' onClick={() => setStep(step - 1)} onMouseDown={preventOutline} disabled={step <= 0} className={style.prev}>Prevoius</button>
          {steps[step]}
          <button type='button' onClick={handleNext} onMouseDown={preventOutline} disabled={nextDisabled} className={style.next}>Next</button>
        </form>
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
