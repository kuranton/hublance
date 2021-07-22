import {useState, useRef, useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEventListener} from '@util/useEventListener'

import {removeCountry, setRate, removeCertification} from '@store/filtersSlice'
import {loadFreelancers} from '@store/freelancersSlice'

import style from './Filter.module.css'

import Popup from './Popup'
import Badge from './Badge'

const Filter = ({setTransform}) => {
  const box = useRef({})
  const popupWrap = useRef({})
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupRender, setPopupRender] = useState(false)
  const [badges, setBadges] = useState([])

  const dispatch = useDispatch()
  const certifications = useSelector(state => state.filters.certifications)
  const widths = useSelector(state => state.filters.widths)
  const countries = useSelector(state => state.filters.countries)
  const rate = useSelector(state => state.filters.rate)

  const openPopup = () => {
    setPopupRender(true)
    setPopupVisible(true)
  }

  const closePopup = useCallback((e) => {
    if (!popupVisible) {
      return
    }
    if (popupWrap.current && !popupWrap.current.contains(e.target)) {
      setPopupVisible(false)
    }
  }, [popupVisible])

  const transform = useRef({x:43, y:0})

  useEffect(() => {
    transform.current = {x: 43, y: 0}

    const generateBadge = (type) => (entry, index) => {
      const width = widths[type][index]
      if (transform.current.x + width > box.current.offsetWidth - 44) { // 44 is padding
        transform.current.x = 0
        transform.current.y += 31
      }
      const actionToRemove = type === 'countries' ? removeCountry : removeCertification
      const badge = (
        <Badge
          index={index}
          type={type}
          transform={`translate(${transform.current.x}px, ${transform.current.y}px)`}
          key={entry}
          className={`${style[type]} ${index % 2 === 0 ? style.even : style.odd}`}
          remove={() => {
            dispatch(actionToRemove(entry))
            dispatch(loadFreelancers({}))
          }}
        >
          {entry}
        </Badge>
      )

      transform.current.x += width
      return badge
    }

    let badges = [...certifications.map(generateBadge('certifications')), ...countries.map(generateBadge('countries'))]

    if (rate.min || rate.max) {
      const width = widths.rate[0]
      if (transform.current.x + width > box.current.offsetWidth - 44) { // 44 is padding
        transform.current.x = 0
        transform.current.y += 31
      }
      badges.push(
        <Badge
          key='rate'
          transform={`translate(${transform.current.x}px, ${transform.current.y}px)`}
          className={style.rate}
          type='rate'
          remove={() => {
            dispatch(setRate({min: 0, max: 0}))
            dispatch(loadFreelancers({}))
          }}
        >
          {rate.text}
        </Badge>
      )
      transform.current.x += width
    }

    if (transform.current.x + popupWrap.current.offsetWidth > box.current.offsetWidth - 44) {
      transform.current.x = 0
      transform.current.y += 31
    }
    setTransform(transform.current.y)
    setBadges(badges)
  }, [certifications, countries, rate, widths, dispatch, setTransform])

  useEventListener('mousedown', closePopup)
  return(
    <div className={style.wrap}>
      <div ref={box} className={style.box}>
        <span className={style.label}>Filters:</span>
        {badges}
        <div ref={popupWrap} className={style.popupWrap} style={{transform: `translate(${transform.current.x - 43}px, ${transform.current.y}px)`}}>
          <button className={`${style.addButton} ${popupVisible ? style.pushed : ''}`} aria-label='add filter' onMouseDown={(e) => e.preventDefault()} onClick={openPopup}>
            Add filter
          </button>
          {popupRender ?
            <Popup visible={popupVisible} remove={() => setPopupRender(false)} hide={() => setPopupVisible(false)}/>
          : null}
        </div>
        <div className={style.borderTop}/>
        <div className={style.borderMiddle} style={{transform: `scaleY(${transform.current.y})`}}/>
        <div className={style.borderBottom} style={{transform: `translateY(${transform.current.y}px)`}}/>
      </div>
      <div className={style.background} style={{transform: `scaleY(${transform.current.y + 10})`}}/>
    </div>
  )
}

export default Filter
