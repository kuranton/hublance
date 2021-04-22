import {useState} from 'react'
import style from './Popup.module.css'

import Certifications from './Certifications'
import Country from './Country'
import Rate from './Rate'

const Popup = () => {
  const [type, setType] = useState('')

  return(
    <div className={style.wrap}>
      {type === '' ?
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
      : null}
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
  )
}

export default Popup
