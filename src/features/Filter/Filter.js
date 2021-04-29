import {useState, useRef, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEventListener} from '@util/useEventListener'

import {removeCountry, setMinRate, setMaxRate, removeCertification} from '@store/filtersSlice'

import style from './Filter.module.css'

import Popup from './Popup'
import Badge from './Badge'

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
      {/* {!certifications.length && !countries.length && !rate.min && !rate.max ? */}
      <span className={style.label}>Filters:</span>
      {/* : null} */}
      {countries.map(country => (
        <Badge
          key={country}
          className={style.country}
          remove={() => dispatch(removeCountry(country))}
        >
          {country}
        </Badge>
      ))}
      {rate.min || rate.max ?
        <Badge
          className={style.rate}
          remove={() => {dispatch(setMinRate(0)); dispatch(setMaxRate(0))}}
        >
          {rate.min ? rate.max ? `$${rate.min} - $${rate.max}` : `Above $${rate.min}` : `Below $${rate.max}`}
        </Badge>
      : null}
      {certifications.map((certification, index) => (
        <Badge
          key={certification}
          className={`${style.certification} ${index % 2 === 0 ? style.even : style.odd}`}
          remove={() => dispatch(removeCertification(certification))}
        >
          {certification}
        </Badge>
      ))}

      <div ref={popupWrap} style={{fontSize: 0, position: 'relative', display: 'inline-block'}}>
        <button className={`${style.addButton} ${popup ? style.pushed : ''}`} aria-label='add filter' onMouseDown={(e) => e.preventDefault()} onClick={() => setPopup(true)}>
          Add filter
        </button>
        <Popup visible={popup} hide={() => setPopup(false)}/>
      </div>
    </div>
  )
}

export default Filter
