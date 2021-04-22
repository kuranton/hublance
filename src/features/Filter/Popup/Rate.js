import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setRate as saveRate} from '@store/filtersSlice'

import listStyle from './List.module.css'
import style from './Rate.module.css'

import Footer from './Footer'

const rates = [{
  label: 'Below $30',
  min: 0,
  max: 30
}, {
  label: '$30 - $50',
  min: 30,
  max: 50
}, {
  label: '$50 - $75',
  min: 50,
  max: 75
}, {
  label: '$75 - $100',
  min: 75,
  max: 100
}, {
  label: 'Above $100',
  min: 100,
  max: 0
}]

const Certifications = ({onCancel}) => {
  const [rate, setRate] = useState(useSelector(state => state.filters.rate) || {min: 0, max: 0})
  const dispatch = useDispatch()
  const {min, max} = rate

  const save = () => {
    dispatch(saveRate(rate))
  }

  return(
    <>
      <ul className={listStyle.list} style={{padding: '18px 0 0 0', height: 'auto'}}>
        {rates.map((item, index) => (
          <li key={index} className={`${listStyle.item} ${min === item.min && max === item.max ? listStyle.selected : ''}`} onClick={() => setRate({min: item.min, max: item.max})}>
            <button className={listStyle.radio}>Select</button>
            {item.label}
          </li>
        ))}
      </ul>
      <div className={style.customRange}>
        <div className={style.inputWrap}>
          <label htmlFor='from' className={style.label}>From</label>
          <input type='number' name='from' className={style.input} onChange={(e) => setRate({min: e.target.value, max: rate.max})} value={min ? min : ''}/>
        </div>
        <span>&ndash;</span>
        <div className={style.inputWrap}>
          <label htmlFor='to' className={style.label}>To</label>
          <input type='number' name='to' className={style.input} onChange={(e) => setRate({min: rate.min, max: e.target.value})} value={max ? max : ''}/>
        </div>
      </div>
      <Footer onCancel={onCancel} onSave={save}/>
    </>
  )
}

export default Certifications
