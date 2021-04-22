import {useState, useRef, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEventListener} from '@util/useEventListener'

import {removeCountry, setMinRate, setMaxRate, removeCertification} from '@store/filtersSlice'

import style from './Filter.module.css'

import Popup from './Popup'

const Filter = () => {
  const popupWrap = useRef({})
  const [popup, setPopup] = useState(false)

  const dispatch = useDispatch()
  const certifications = useSelector(state => state.filters.certifications)
  const countries = useSelector(state => state.filters.countries)
  const rate = useSelector(state => state.filters.rate)

  const closePopup = useCallback((e) => {
    if (!popup) {
      return
    }
    if (popupWrap.current && !popupWrap.current.contains(e.target)) {
      setPopup(false)
    }
  }, [popup])

  useEventListener('click', closePopup)
  return(
    <div className={style.wrap}>
      {!certifications.length && !countries.length && !rate.min && !rate.max ?
        <span>Filters:</span>
      : null}
      {countries.map(country => (
        <span key={country} className={style.country}>
          {country}
          <button className={style.remove} onClick={() => dispatch(removeCountry(country))}>Remove</button>
        </span>
      ))}
      {rate.min || rate.max ?
        <span className={style.rate}>
          {rate.min ? rate.max ? `$${rate.min} - $${rate.max}` : `Above $${rate.min}` : `Below $${rate.max}`}
          <button className={style.remove} onClick={() => {dispatch(setMinRate(0)); dispatch(setMaxRate(0))}}>Remove</button>
        </span>
      : null}
      {certifications.map((certification, index) => (
        <span key={certification} className={`${style.certification} ${index % 2 === 0 ? style.even : style.odd}`}>
          {certification}
          <button className={style.remove} onClick={() => dispatch(removeCertification(certification))}>Remove</button>
        </span>
      ))}
      <span className={style.addButton} aria-label='add filter' onMouseDown={(e) => e.preventDefault()} onClick={() => setPopup(true)}>
        Add filter
        {popup ?
          <div ref={popupWrap}>
            <Popup/>
          </div>
        : null}
      </span>
    </div>
  )
}

export default Filter
