import DatePicker from '@components/DatePicker/DatePicker'
import Modal from '@components/Modal/Modal'
import Label from '@components/Label/Label'
import Input from '@components/Input/Input'
import Button from '@components/Button/Button'

import style from './AddCertificationModal.module.css'
import 'react-datepicker/dist/react-datepicker.css'

const AddCertificationModal = ({close, add}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    add()
    close()
  }
  return(
    <Modal close={close} title='Add Certification'>
      <div className={style.body}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <Label htmlFor='cert-name'>Certification Name</Label>
            <Input type='text' name='cert-name'/>
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
            <Button type='submit' className={style.submit} primary>Add certification</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AddCertificationModal
