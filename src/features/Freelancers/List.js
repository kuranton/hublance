import {useSelector} from 'react-redux'
import style from './List.module.css'

import Single from './Single'
import Scroller from '@components/Scroller/Scroller'

import Join from '@features/Signup/Join'
import Form from '@features/Signup/Form'
import Details from '@features/Signup/Details'

import {freelancers} from './_mockData'

const List = () => {
  const signupStarted = useSelector(store => store.signup.started)
  const signedUp = useSelector(store => store.signup.submitted)
  const signupVisible = useSelector(store => store.signup.visible)
  return(
    <div className={style.wrap}>
      <div className={style.header}>
        <span>Photo</span>
        <span>Title</span>
        <span>Name</span>
        <span>Hourly rate</span>
        <span>Country</span>
      </div>

      <div className={style.body}>
        <ul className={style.list}>
          {signupVisible ?
            signedUp ?
              <li>
                <Details/>
              </li>
            :
            signupStarted ?
              <Form/>
            :
            <li className={style.row}>
              <Join/>
            </li>
          : null
          }

          {freelancers.map(freelancer => <li key={freelancer.id} className={style.row}><Single data={freelancer}/></li>)}
          {freelancers.map(freelancer => <li key={freelancer.id} className={style.row}><Single data={freelancer}/></li>)}
          {freelancers.map(freelancer => <li key={freelancer.id} className={style.row}><Single data={freelancer}/></li>)}
          {freelancers.map(freelancer => <li key={freelancer.id} className={style.row}><Single data={freelancer}/></li>)}
        </ul>
      </div>
    </div>
  )
}

export default List
