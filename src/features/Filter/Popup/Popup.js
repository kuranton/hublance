import {useState, useEffect} from 'react'
import style from './Popup.module.css'

import Certifications from './Certifications'
import Country from './Country'
import Rate from './Rate'

const Popup = ({visible}) => {
  const [shouldRender, setRender] = useState(visible)
  const [type, setType] = useState('')

  useEffect(() => {
    if (visible) {
      setRender(true)
    }
  }, [visible])

  const onAnimationEnd = () => {
    if (!visible) {
      setRender(false)
      setType('')
    }
  }

  let styleObj = {
    height: 149
  }

  if (type === 'certifications' || type === 'country') {
    styleObj.height = 459
  } else if (type === 'rate') {
    styleObj.height = 414
  }

  if (!visible) {
    styleObj.animationName = style.disappear
  }

  return(
    shouldRender && (
      <div className={`${style.wrap} ${type !== '' ? style.typeSelected : ''}`} onAnimationEnd={onAnimationEnd} style={styleObj}>
        <div className={style.typeSelect}>
          <div className={style.row} onMouseDown={() => setType('certifications')}>
            Certifications
          </div>
          <div className={style.row} onMouseDown={() => setType('country')}>
            Country
          </div>
          <div className={style.row} onMouseDown={() => setType('rate')}>
            Hourly Rate
          </div>
        </div>
        <div className={style.type}>
          {type === 'certifications' ?
            <Certifications onCancel={() => setType('')}/>
          : null}
          {type === 'country' ?
            <Country onCancel={() => setType('')}/>
          : null}
          {type === 'rate' ?
            <Rate onCancel={() => setType('')}/>
          : null}
        </div>
      </div>
    )
  )
}

export default Popup
