import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
// import Select from 'react-select'
import Select from '../../components/Select/Select'
import Input from '../../components/Input/Input'
import Certifications from '../../components/Certifications/Certifications'
import UploadPic from './UploadPic'

import detailsStyle from './Details.module.css'
import style from '../Freelancers/Single.module.css'
import {row} from '../Freelancers/List.module.css'

import {setName, setRate, setEmail, setAbout, setCountry, addCertification, hide} from './signupSlice'

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

const Details = ({data = {}}) => {
  const [countries, setCountries] = useState([])

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
    <form className={row}>
      <UploadPic url={data.photoUrl}/>
      <div className={style.title}>{job}</div>
      <Input type='text' name='name' placeholder='Name' value={name} onChange={(e) => dispatch(setName(e.target.value))}/>
      <Select name='rate' placeholder='Rate' options={getRates()} value={rate} onChange={(value) => dispatch(setRate(value))}/>
      <Select name='country' placeholder='Country' options={countries} value={country} onChange={(value) => dispatch(setCountry(value))}/>
      {/* <button
        className={style.buttonExpand}
        aria-label='expand'
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setExpanded(!expanded)}
        style={expanded ? {transform: 'rotate(180deg)'} : {}}
        >
        Expand
      </button> */}

      <span className={style.aboutTitle}>
        About:
      </span>
      <Input
        textarea={true}
        placeholder='Please share more details about your expertise...'
        className={style.about} style={{minHeight: 187}}
        value={about}
        onChange={(e) => dispatch(setAbout(e.target.value))}
      >
      </Input>

      <span className={style.certificationsTitle}>
        Certifications ({certifications.length}):
      </span>
      <div className={detailsStyle.certificationsWrap}>
        <div className={detailsStyle.certifications}>
          <button type='button' className={detailsStyle.btnAddCert} onClick={() => dispatch(addCertification())}>Add certification</button>
          <div>
            <Certifications list={certifications} slidesToShow={2}/>
          </div>

        </div>
      </div>

      <span className={style.contactTitle}>
        Contact:
      </span>
      <Input className={style.contact} type='email' name='email' placeholder='Email' value={email} onChange={(e) => dispatch(setEmail(e.target.value))}/>

      <button type='button' className={detailsStyle.btnClose} onClick={() => dispatch(hide())}>Close</button>
      <button type='button' className={detailsStyle.btnSave}>Save profile</button>
    </form>
  )
}

export default Details
