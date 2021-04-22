import {useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {fetchFreelancers} from '@store/freelancersSlice'

import style from './List.module.css'

import Single from './Single'

import Join from '@features/Signup/Join'
import Form from '@features/Signup/Form'
import Profile from '@features/Profile'

const List = () => {
  const dispatch = useDispatch()
  const freelancers = useSelector(store => store.freelancers.list)
  const filters = useSelector(store => store.filters)
  const started = useSelector(store => store.signup.started)
  const visible = useSelector(store => store.signup.visible)
  const editing = useSelector(store => store.profile.editing)
  const {certifications, countries, rate} = filters

  const filtered = useMemo(() => freelancers.filter(freelancer => {
    if (
      freelancer.rate < rate.min ||
      (rate.max && freelancer.rate > rate.max) ||
      (certifications.length && !certifications.every(certification => freelancer.certifications.includes(certification))) ||
      (countries.length && !countries.includes(freelancer.country))
    ) {
      return false
    } else {
      return true
    }
  }), [freelancers, certifications, countries, rate])

  useEffect(() => {
    dispatch(fetchFreelancers())
  }, [dispatch])

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

          {filtered.map(freelancer => <li key={freelancer.id} className={style.row}><Single data={freelancer}/></li>)}
        </ul>
      </div>
    </div>
  )
}

export default List
