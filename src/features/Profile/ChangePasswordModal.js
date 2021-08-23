import {useRef, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {changePassword, setSuccess} from '@store/authSlice'

import {validatePassword} from '@util/validatePassword'

import style from './ChangePasswordModal.module.css'

import Modal from '@components/Modal'
import Input from '@components/Input'
import Button from '@components/Button'

const ChangePasswordModal = ({positionRef, close}) => {
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [warning, setWarning] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const error = useSelector(store => store.auth.errors.change)
  const success = useSelector(store => store.auth.success.change)

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const validation = validatePassword(newPassword)
    if (!validation.passes) {
      setWarning(validation.warning)
      setSuggestions(validation.suggestions)
      return
    }
    dispatch(changePassword({oldPassword, newPassword}))
  }

  const changeNewPassword = (value) => {
    if (warning) {
      const validation = validatePassword(value)
      if (!validation.passes) {
        setWarning(validation.warning)
        setSuggestions(validation.suggestions)
      } else {
        setWarning('')
        setSuggestions([])
      }
    }
    setNewPassword(value)
  }

  useEffect(() => {
    if (success) {
      dispatch(setSuccess({change: false}))
      modalRef.current.onClose()
    }
  }, [success, dispatch])

  return(
    <Modal ref={modalRef} positionRef={positionRef} close={close} title='Change Password' className={style.modal}>
      <form className={style.form} onSubmit={handleSubmit}>
        <Input className={style.input} type='password' name='oldPassword' placeholder='Old Password' defaultValue={oldPassword} onChange={(value) => setOldPassword(value)}/>
        <Input className={style.input} type='password' name='newPassword' placeholder='New Password' defaultValue={newPassword} onChange={changeNewPassword}/>
        {warning &&
          <p className={style.error}>{warning}</p>
        }
        {suggestions.map(suggestion =>
          <p key={suggestion} className={style.suggestion}>{suggestion}</p>
        )}
        {error &&
          <p className={style.error}>{error}</p>
        }
        <div className={style.buttonsGroup}>
          <Button onClick={() => modalRef.current.onClose()}>Close</Button>
          <Button type='submit' primary disabled={!oldPassword || !newPassword || warning}>Submit</Button>
        </div>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal
