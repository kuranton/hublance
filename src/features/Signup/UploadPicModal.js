import {useState, useRef} from 'react'
import style from './UploadPicModal.module.css'

import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import Canvas from './UploadPicCanvas'

const UserPicModal = ({close, upload, url, setUrl}) => {
  const [cropping, setCropping] = useState(false)
  const uploader = useRef(null)
  const canvas = useRef(null)

  const triggerUpload = () => {
    if (uploader && uploader.current) {
      uploader.current.click()
    }
  }

  const handleUploaderClick = (e) => {
    if (e.isTrusted) {
      e.preventDefault()
    }
  }

  const handleUpload = (e) => {
    upload(e)
    setCropping(true)
  }

  const save = () => {
    canvas.current.save()
  }

  return(
    <Modal close={close} title='Edit Photo'>
      <div className={style.body}>
        <Canvas url={url} setUrl={setUrl} ref={canvas} close={close}/>
        <div className={style.overlay}/>
        <div className={style.circle}/>
        {!cropping ?
          <input ref={uploader} type='file' name='profile-pic' className={style.uploader} onChange={handleUpload} onClick={handleUploaderClick}/>
        : null}
      </div>
      <div className={style.footer}>
        <div className={style.controls}>
          <button type='button' className={`${style.button} ${style.crop}`}>
            <span className={style.iconCrop}/>
            <span>Crop</span>
          </button>

          <button type='button' className={`${style.button} ${style.crop}`} onClick={triggerUpload}>
            <span className={style.iconCamera}/>
            <span>Add Photo</span>
          </button>

          <button type='button' className={`${style.button} ${style.crop}`}>
            <span className={style.iconBin}/>
            <span>Delete</span>
          </button>
        </div>
        <Button primary onClick={save}>Save</Button>
      </div>
    </Modal>
  )
}

export default UserPicModal
