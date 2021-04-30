import {useEffect, useMemo, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {fetchFreelancers} from '@store/freelancersSlice'

import style from './List.module.css'

import Single from './Single'

import Join from '@features/Signup/Join'
import Form from '@features/Signup/Form'
import Profile from '@features/Profile'

const List = () => {
  const [offsets, setOffsets] = useState([])
  const dispatch = useDispatch()
  const freelancers = useSelector(store => store.freelancers.list)
  const filters = useSelector(store => store.filters)
  const started = useSelector(store => store.signup.started)
  const visible = useSelector(store => store.signup.visible)
  const editing = useSelector(store => store.profile.editing)
  const {certifications, countries, rate} = filters

  const filtered = useMemo(() => freelancers.reduce((accumulator, currentValue, currentIndex) => {
    if (
      currentValue.rate > rate.min &&
      (!rate.max || currentValue.rate < rate.max) &&
      (!certifications.length || certifications.every(certification => currentValue.certifications.includes(certification))) &&
      (!countries.length || countries.includes(currentValue.country))
    ) {
      let offset = 0
      offsets.forEach(({index, amount}) => {
        if (index < currentIndex) {
          offset += amount
        }
      })
      accumulator.push({...currentValue, offset, index: currentIndex})
    }
    return accumulator
  }, []), [freelancers, certifications, countries, rate, offsets])

  useEffect(() => {
    dispatch(fetchFreelancers())
  }, [dispatch])

  const addOffset = (item) => {
    setOffsets([...offsets, item])
  }

  const removeOffset = useCallback((index) => {
    setOffsets(offsets => offsets.filter(item => item.index !== index))
  }, [])

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
            <Join/>
          : null
          }

          {filtered.map((freelancer, index) =>
            <Single key={freelancer.id} data={freelancer} addOffset={addOffset} removeOffset={removeOffset} isLast={index > filtered.length - 3}/>
          )}
        </ul>
      </div>
    </div>
  )
}

export default List
