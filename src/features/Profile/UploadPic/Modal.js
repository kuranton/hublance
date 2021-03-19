import {useState, useRef} from 'react'
import style from './Modal.module.css'

import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Button/Button'
import Canvas from './Canvas'

const UserPicModal = ({close, upload, url, setUrl}) => {
  const [cropping, setCropping] = useState(false)
  const [dragging, setDragging] = useState(false)
  const uploader = useRef(null)
  const canvas = useRef(null)

  const triggerUpload = () => {
    if (uploader && uploader.current) {
      uploader.current.click()
    }
  }

  const handleUpload = (e) => {
    upload(e)
    setCropping(true)
    setDragging(false)
  }

  const save = () => {
    if (!url) {
      close()
      return
    }
    canvas.current.save()
  }

  return(
    <Modal close={close} title='Edit Photo'>
      <div className={style.body} onDragEnter={() => setDragging(true)}>
        <Canvas url={url} setUrl={setUrl} ref={canvas} close={close} cropping={cropping}/>
        <div className={style.overlay}/>
        <div className={`${style.circle} ${cropping ? style.cropping : ''}`}/>
        <input
          type='file'
          name='profile-pic'
          ref={uploader}
          className={style.uploader}
          onDragOver={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
          onChange={handleUpload}
          style={{pointerEvents: dragging ? 'all' : 'none'}}
        />
      </div>
      <div className={style.footer}>
        <div className={style.controls}>
          <button type='button' className={`${style.button} ${cropping ? style.active : ''}`} disabled={!url} onClick={() => setCropping(!cropping)}>
            <span className={style.iconCrop}/>
            <span>Crop</span>
          </button>

          <button type='button' className={style.button} onClick={triggerUpload}>
            <span className={style.iconCamera}/>
            <span>Add Photo</span>
          </button>

          <button type='button' className={style.button} disabled={!url} onClick={() => setUrl(null)}>
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
