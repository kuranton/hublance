import {useState, useLayoutEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setCertifications as saveCertifications, setCountries as saveCountries, setRate as saveRate} from '@store/filtersSlice'
import {filterFreelancers} from '@store/freelancersSlice'

import style from './Popup.module.css'

import Header from '@components/Popup/Header'
import Footer from '@components/Popup/Footer'

import Certifications from './Certifications'
import Country from './Country'
import Rate from './Rate'

const Popup = ({visible, hide, remove}) => {
  const typeSelect = useRef(null)
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const [bodyHeight, setHeight] = useState(0)
  const [certifications, setCertifications] = useState(useSelector(store => store.filters.certifications) || [])
  const [countries, setCountries] = useState(useSelector(state => state.filters.countries) || [])
  const [rate, setRate] = useState(useSelector(state => state.filters.rate) || {min: 0, max: 0})
  const dispatch = useDispatch()

  const save = () => {
    switch(type) {
      case 'certifications':
        dispatch(saveCertifications(certifications))
        dispatch(filterFreelancers())
        break
      case 'country':
        dispatch(saveCountries(countries))
        dispatch(filterFreelancers())
        break
      case 'rate':
        dispatch(saveRate(rate))
        dispatch(filterFreelancers())
        break
      default:
        break
    }
  }

  const onAnimationEnd = () => {
    if (!visible) {
      remove()
    }
  }

  useLayoutEffect(() => {
    if (!typeSelect.current || type !== '') {
      return
    }
    const height = typeSelect.current.offsetHeight
    setHeight(height + 24)
  }, [type])

  return(
    <div className={`${style.wrap} ${type !== '' ? style.typeSelected : ''}`} onAnimationEnd={onAnimationEnd} style={!visible ? {animationName: style.disappear} : {}}>
      <Header searchVisible={type !== ''} search={search} setSearch={setSearch}/>

      <div className={style.body} style={(type === '' || type === 'rate') ? {transform: 'translateY(-31px)', zIndex: 1} : {}}>
        <div className={style.background} style={{transform: `scaleY(${(bodyHeight - (type === '' ? 24 : 0))/100})`}}/>
        <div className={style.overflowWrap}>
          <div ref={typeSelect} className={style.typeSelect}>
            <div className={style.row} onClick={() => setType('certifications')}>
              Certifications
            </div>
            <div className={style.row} onClick={() => setType('country')}>
              Country
            </div>
            <div className={style.row} onClick={() => setType('rate')}>
              Hourly Rate
            </div>
          </div>
          <div className={style.type}>
            <Certifications height={bodyHeight} setHeight={setHeight} search={search} visible={type === 'certifications'} selected={certifications} setSelected={setCertifications}/>
            <Country height={bodyHeight} setHeight={setHeight} search={search} visible={type === 'country'} selected={countries} setSelected={setCountries}/>
            <Rate setHeight={setHeight} visible={type === 'rate'} rate={rate} setRate={setRate}/>
          </div>
        </div>
      </div>

      <Footer translateY={bodyHeight - (type === '' ? 122 : type === 'rate' ? 31 : 0)} buttonsVisible={type !== ''} onCancel={hide} onSave={save}/>
    </div>
  )
}

export default Popup
