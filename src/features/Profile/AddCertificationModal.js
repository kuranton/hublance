import {useRef, useState, useMemo} from 'react'
import {useSelector} from 'react-redux'

import DatePicker from '@components/DatePicker/DatePicker'
import Modal from '@components/Modal/Modal'
import Label from '@components/Label/Label'
import Input from '@components/Input/Input'
import Select from '@components/Select/Select'
import Button from '@components/Button/Button'

import style from './AddCertificationModal.module.css'
import 'react-datepicker/dist/react-datepicker.css'

// import {certifications} from '@store/freelancersSlice'

const AddCertificationModal = ({close, add, positionRef}) => {
  const modalRef = useRef(null)
  const [selected, setSelected] = useState([])
  const added = useSelector(store => store.profile.certifications)
  const certifications = useSelector(store => store.certifications)
  const list = useMemo(() => {
    const names = certifications.map(cert => cert.name)
    const addedNames = added.map(cert => cert.name)
    return names.filter(name => addedNames.indexOf(name) === -1)
  }, [certifications, added])

  const handleSubmit = (e) => {
    e.preventDefault()
    add(certifications.find(cert => cert.name === selected[0]))
    modalRef.current.onClose()
  }
  return(
    <Modal ref={modalRef} close={close} title='Add Certification' positionRef={positionRef}>
      <div className={style.body}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <Label htmlFor='cert-name'>Certification Name</Label>
            <Select multiple={false} options={list} selected={selected} set={(value) => setSelected([value])} width={'100%'}/>
          </div>
          <div>
            <Label htmlFor='date-issued'>Date Issued</Label>
            <DatePicker name='date-issued' placeholderText='yyyy/mm/dd'/>
          </div>

          <div>
            <Label htmlFor='cert-name'>Certification ID</Label>
            <Input type='text' name='cert-id'/>
          </div>
          <div>
            <Label htmlFor='date-exp'>Date Expires</Label>
            <DatePicker name='date-exp' placeholderText='yyyy/mm/dd'/>
          </div>

          <div>
            <Label htmlFor='cred-url'>Credential URL</Label>
            <Input type='text' name='cred-url'/>
          </div>

          <div className={style.buttonsGroup}>
            <Button className={style.close} onClick={close}>Close</Button>
            <Button type='submit' className={style.submit} primary disabled={!selected.length}>
              Add certification
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AddCertificationModal
