import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Select from '../../components/Select/Select'
import Input from '../../components/Input/Input'
import Label from '../../components/Label/Label'
import Button from '../../components/Button/Button'
import Certifications from '../../components/Certifications/Certifications'
import UploadPic from './UploadPic'

import Progress from './Progress'
import Title from './Title'
import AddCertificationModal from './AddCertificationModal'

import style from './Details.module.css'

import {setName, setRate, setEmail, setAbout, setCountry, setPhotoUrl, addCertification, hide} from './signupSlice'

const getRates = () => {
  let rates = []
  for (var i=1; i<21; i++) {
    rates.push({
      value: i*5,
      label: `$${i*5}`
    })
  }
  return rates
}

const Details = () => {
  const [expanded, setExpanded] = useState(false)
  const [countries, setCountries] = useState([])
  const [certificationsModal, setCertificationsModal] = useState(false)

  const dispatch = useDispatch()
  const name = useSelector(store => store.signup.name)
  const rate = useSelector(store => store.signup.rate)
  const email = useSelector(store => store.signup.email)
  const about = useSelector(store => store.signup.about)
  const country = useSelector(store => store.signup.country)
  const photoUrl = useSelector(store => store.signup.photoUrl)
  const certifications = useSelector(store => store.signup.certifications)

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(`https://restcountries.eu/rest/v2/all?fields=name`)
      const json = await res.json()
      setCountries(json.map(item => ({
        value: item.name,
        label: item.name
      })))
    }

    fetchCountries()
  }, [])
  return(
    <div className={style.wrap}>
      <Progress/>

      <form className={style.form}>
        <div className={style.photoGroup}>
          <UploadPic url={photoUrl} save={(value) => dispatch(setPhotoUrl(value))}/>
        </div>

        <Title/>

        <Input className={style.name} type='text' name='name' placeholder='Name' value={name} onChange={(e) => dispatch(setName(e.target.value))}/>

        <Select className={style.rate} name='rate' placeholder='Rate' options={getRates()} value={rate} onChange={(value) => dispatch(setRate(value))}/>

        <Select className={style.country} name='country' placeholder='Country' options={countries} value={country} onChange={(value) => dispatch(setCountry(value))} searchable/>

        <label htmlFor='about' className={style.label}>About:</label>
        <Input
          name='about'
          textarea={true}
          placeholder='Please share more details about your expertise...'
          className={style.about}
          style={{minHeight: 187}}
          value={about}
          onChange={(e) => dispatch(setAbout(e.target.value))}
        />

        <span className={style.label}>
          Certifications ({certifications.length}):
        </span>
        <div className={style.certificationsWrap}>
          <div className={style.certifications}>
            <button type='button' className={style.btnAddCert} onClick={() => setCertificationsModal(true)}>Add certification</button>
            <div>
              <Certifications list={certifications} slidesToShow={2}/>
            </div>
            {certificationsModal ?
              <AddCertificationModal close={() => setCertificationsModal(false)} add={() => dispatch(addCertification())}/>
            : null}
          </div>
        </div>

        <label className={style.label} htmlFor='email' style={{marginTop: '5px'}}>Contact:</label>
        <Input className={style.contact} type='email' name='email' placeholder='Email' value={email} onChange={(e) => dispatch(setEmail(e.target.value))}/>

        <Button className={style.btnClose} onClick={() => dispatch(hide())}>Close</Button>
        <Button className={style.btnSave} primary>Save profile</Button>

        {/* <button
          className={style.buttonExpand}
          aria-label='expand'
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setExpanded(!expanded)}
          style={expanded ? {transform: 'rotate(180deg)'} : {}}
          >
          Expand
        </button> */}
      </form>
    </div>
  )
}

export default Details
