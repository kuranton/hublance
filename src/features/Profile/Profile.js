import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setName, setRate, setEmail, setAbout, setCountry, setPhotoUrl, addCertification} from '@store/profileSlice'
import {hide} from '@store/signupSlice'

import style from './Profile.module.css'

import Select from '@components/Select/Select'
import Input from '@components/Input/Input'
import Button from '@components/Button/Button'
import Certifications from '@components/Certifications/Certifications'
import ImageEditor from './ImageEditor'
import Progress from './Progress'
import Title from './Title'
import AddCertificationModal from './AddCertificationModal'

const Profile = () => {
  const [countries, setCountries] = useState([])
  const [certificationsModal, setCertificationsModal] = useState(false)

  const dispatch = useDispatch()
  const name = useSelector(store => store.profile.name)
  const rate = useSelector(store => store.profile.rate)
  const email = useSelector(store => store.profile.email)
  const about = useSelector(store => store.profile.about)
  const country = useSelector(store => store.profile.country)
  const photoUrl = useSelector(store => store.profile.photoUrl)
  const certifications = useSelector(store => store.profile.certifications)

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
          <ImageEditor url={photoUrl} save={(value) => dispatch(setPhotoUrl(value))}/>
        </div>

        <Title/>

        <Input className={style.name} type='text' name='name' placeholder='Name' defaultValue={name} onSubmit={(value) => dispatch(setName(value))}/>

        <Input
          name='rate'
          className={style.rate}
          defaultValue={rate}
          onSubmit={(value) => dispatch(setRate(value))}
          prefix='$'
        />

        <Select className={style.country} name='country' placeholder='Country' options={countries} value={country} onChange={(value) => dispatch(setCountry(value))} searchable/>

        <label htmlFor='about' className={style.label}>About:</label>
        <Input
          name='about'
          textarea={true}
          placeholder='Please share more details about your expertise...'
          className={style.about}
          style={{minHeight: 187}}
          defaultValue={about}
          onSubmit={(value) => dispatch(setAbout(value))}
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
        <Input className={style.contact} type='email' name='email' placeholder='Email' defaultValue={email} onSubmit={(value) => dispatch(setEmail(value))}/>

        <Button className={style.btnClose} onClick={() => dispatch(hide())}>Close</Button>
        <Button className={style.btnSave} primary>Save profile</Button>
      </form>
    </div>
  )
}

export default Profile
