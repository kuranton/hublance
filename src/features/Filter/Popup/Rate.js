import {useRef, useLayoutEffect} from 'react'

import listStyle from '@components/Popup/List.module.css'
import itemStyle from '@components/Popup/Item.module.css'
import style from './Rate.module.css'

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

const Rate = ({visible, setHeight, rate, setRate}) => {
  const wrap = useRef(null)
  const {min, max} = rate

  useLayoutEffect(() => {
    if (!visible) {
      return
    }

    setHeight(wrap.current.getBoundingClientRect().height)
  }, [visible, setHeight])

  return(
    <div ref={wrap} style={!visible ? {display: 'none'} : {marginTop: -12}}>
      <ul className={listStyle.list} style={{height: 'auto'}}>
        {rates.map((item, index) => (
          <li
            key={index}
            className={`${itemStyle.item} ${min === item.min && max === item.max ? itemStyle.selected : ''}`}
            onClick={() => setRate({min: item.min, max: item.max})}
            style={{position: 'static'}}
          >
            <button className={itemStyle.radio}>Select</button>
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
    </div>
  )
}

export default Rate
