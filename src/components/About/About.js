import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {edit, show, startSignup} from '@store/profileSlice'

import Button from '@components/Button'

import style from './About.module.css'

const About = () => {
  const dispatch = useDispatch()
  const submitted = useSelector(store => store.profile.status.signedUp)
  let history = useHistory()

  const join = () => {
    dispatch(show())
    if (submitted) {
      dispatch(edit())
    } else {
      dispatch(startSignup())
    }
    history.push('/')
  }

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>About</h2>
      <div className={style.card}>
        <header className={style.header}>
          <h3 className={style.heading}>Need some expert help with HubSpot?</h3>
          <p className={style.tagline}>You are in the right place!</p>
        </header>
        <main className={style.content}>
          <p>Hublance is a list of freelancers specializing in HubSpot. It was built out of a personal need. Before Hublance there were two main choices.</p>
          <ol>
            <li>HubSpot partner directory - Nothing but firms, mostly large ones, which are expensive and bueacratic.</li>
            <li>Upwork - Hard to search for HubSpot specific certifications/skills and heavy financial fees.</li>
          </ol>
          <p>This was the catalyst to create <b>Hublance</b>. A free list of HubSpot freelancers (individuals). If you want to join the list please do so as yourself not your company.</p>
          <Button className={style.join} onClick={join} primary>{submitted ? 'View Profile' : 'Join Us'}</Button>
        </main>
      </div>
    </div>
  )
}

export default About
