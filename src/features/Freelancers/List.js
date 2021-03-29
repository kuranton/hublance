import {useSelector} from 'react-redux'
import style from './List.module.css'

import Single from './Single'

import Join from '@features/Signup/Join'
import Form from '@features/Signup/Form'
import Profile from '@features/Profile'

import {freelancers} from './_mockData'

const List = () => {
  const started = useSelector(store => store.signup.started)
  const visible = useSelector(store => store.signup.visible)
  const editing = useSelector(store => store.profile.editing)
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
          {visible ?
            editing ?
              <Profile/>
            :
            started ?
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
