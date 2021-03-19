import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Select from '../../components/Select/Select'
import Input from '../../components/Input/Input'
import Label from '../../components/Label/Label'
import Button from '../../components/Button/Button'
import Certifications from '../../components/Certifications/Certifications'

import UploadPic from './UploadPic/UploadPic'
import Progress from './Progress'
import AddCertificationModal from './AddCertificationModal'

import style from './Profile.module.css'

import {setName, setJob, setRate, setEmail, setAbout, setCountry, addCertification, hide} from './signupSlice'

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

const Profile = ({data = {}}) => {
  const [expanded, setExpanded] = useState(false)
  const [countries, setCountries] = useState([])
  const [certificationsModal, setCertificationsModal] = useState(false)

  const dispatch = useDispatch()
  const name = useSelector(store => store.signup.name)
  const job = useSelector(store => store.signup.job)
  const rate = useSelector(store => store.signup.rate)
  const email = useSelector(store => store.signup.email)
  const about = useSelector(store => store.signup.about)
  const country = useSelector(store => store.signup.country)
  const certifications = useSelector(store => store.signup.certifications)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://restcountries.eu/rest/v2/all?fields=name`)
      const json = await res.json()
      setCountries(json.map(item => ({
        value: item.name,
        label: item.name
      })))
    }

    fetchData()
  }, [])
  return(
    <form className={style.form}>
      <div className={style.progressGroup}>
        <Progress/>
      </div>

      <div className={style.photoGroup}>
        <UploadPic url={data.photoUrl}/>
      </div>

      <div>
        <input type='text' className={style.title} name='title' placeholder='Type Job Title...' value={job} onChange={(e) => dispatch(setJob(e.target.value))}/>
      </div>

      <div className={style.nameGroup}>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' name='name' placeholder='Name' value={name} onChange={(e) => dispatch(setName(e.target.value))}/>
      </div>

      <div className={style.rateGroup}>
        <Label htmlFor='rate'>Hourly Rate</Label>
        <Select name='rate' placeholder='Rate' options={getRates()} value={rate} onChange={(value) => dispatch(setRate(value))}/>
      </div>

      <div className={style.countryGroup}>
        <Label htmlFor='country'>Country</Label>
        <Select name='country' placeholder='Country' options={countries} value={country} onChange={(value) => dispatch(setCountry(value))} searchable/>
      </div>

      <div className={style.contactGroup}>
        <Label htmlFor='email'>Contact</Label>
        <Input className={style.contact} type='email' name='email' placeholder='Email' value={email} onChange={(e) => dispatch(setEmail(e.target.value))}/>
      </div>

      <div className={style.aboutGroup}>
        <Label htmlFor='about'>About</Label>
        <Input
          name='about'
          textarea={true}
          placeholder='Please share more details about your expertise...'
          className={style.about} style={{minHeight: 187}}
          value={about}
          onChange={(e) => dispatch(setAbout(e.target.value))}
        >
        </Input>
      </div>

      <div className={style.certificationsGroup}>
        <Label>
          Certifications ({certifications.length}):
        </Label>
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
      </div>

      <div className={style.buttonsGroup}>
        <Button className={style.btnClose} onClick={() => dispatch(hide())}>Close</Button>
        <Button className={style.btnSave} primary>Save profile</Button>
      </div>

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
  )
}

export default Profile
