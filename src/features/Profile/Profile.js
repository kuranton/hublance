import {useState, useLayoutEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setName, setRate, setEmail, setAbout, setCountry, setPhotoUrl, addCertification, hide, update} from '@store/profileSlice'

import style from './Profile.module.css'

import Select from '@components/Select/Select'
import Input from '@components/Input/Input'
import Button from '@components/Button/Button'
import Certifications from '@components/Certifications/Certifications'
import ImageEditor from './ImageEditor'
import Progress from './Progress'
import Title from './Title'
import AddCertificationModal from './AddCertificationModal'

const Profile = ({setOffset, scroll}) => {
  const wrap = useRef(null)
  const certificationsButton = useRef(null)
  const certificationsWrap = useRef(null)
  const [fading, setFading] = useState(false)
  const [certificationsModal, setCertificationsModal] = useState(false)

  const dispatch = useDispatch()
  const countries = useSelector(store => store.countries)
  const name = useSelector(store => store.profile.data.name)
  const rate = useSelector(store => store.profile.data.rate)
  const email = useSelector(store => store.profile.data.email)
  const about = useSelector(store => store.profile.data.about)
  const country = useSelector(store => store.profile.data.country)
  const photoUrl = useSelector(store => store.profile.data.photoUrl)
  const certifications = useSelector(store => store.profile.data.certifications)

  useLayoutEffect(() => {
    setOffset(wrap.current.getBoundingClientRect().height)
  }, [setOffset])

  const close = () => {
    setFading(true)
    setOffset(-1)
  }

  const handleAnimationEnd = () => {
    if (fading) {
      dispatch(hide())
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(update())
  }

  return(
    <div ref={wrap} className={style.wrap} style={{animationName: fading ? style.disappear : style.appear}} onAnimationEnd={handleAnimationEnd}>
      <Progress/>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.photoGroup}>
          <ImageEditor url={photoUrl} save={(value) => dispatch(setPhotoUrl(value))}/>
        </div>

        <Title/>

        <Input className={style.name} type='text' name='name' placeholder='Name' defaultValue={name} onSubmit={(value) => dispatch(setName(value))}/>

        <Input
          type='number'
          name='rate'
          className={style.rate}
          defaultValue={rate}
          onSubmit={(value) => dispatch(setRate(value))}
          prefix='$'
        />

        <Select
          className={style.country}
          name='country'
          placeholder='Country'
          options={countries}
          selected={[country]}
          set={(value) => dispatch(setCountry(value))}
          multiple={false}
          searchFields={['name', 'alpha3Code', 'altSpellings']}
          searchable
        />

        <label htmlFor='about' className={style.label}>About:</label>
        <Input
          name='about'
          textarea={true}
          placeholder='Please share more details about your expertise...'
          className={style.about}
          style={{minHeight: 187, resize: 'vertical'}}
          defaultValue={about}
          onSubmit={(value) => dispatch(setAbout(value))}
        />

        <span className={style.label}>
          Certifications ({certifications.length}):
        </span>
        <div ref={certificationsWrap} className={style.certificationsWrap}>
          <div className={style.certifications}>
            <button ref={certificationsButton} type='button' className={style.btnAddCert} onClick={() => setCertificationsModal(true)}>Add certification</button>
            <div>
              <Certifications list={certifications} scroll={scroll}/>
            </div>
            {certificationsModal ?
              <AddCertificationModal close={() => setCertificationsModal(false)} add={(cert) => dispatch(addCertification(cert))} positionRef={certificationsButton}/>
            : null}
          </div>
        </div>

        <label className={style.label} htmlFor='email' style={{marginTop: '5px'}}>Contact:</label>
        <Input className={style.contact} type='email' name='email' placeholder='Email' defaultValue={email} onSubmit={(value) => dispatch(setEmail(value))}/>

        <Button className={style.btnClose} onClick={close}>Close</Button>
        <Button type='submit' className={style.btnSave} primary>Save profile</Button>
      </form>
    </div>
  )
}

export default Profile
