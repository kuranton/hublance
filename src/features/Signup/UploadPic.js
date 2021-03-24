import {useState} from 'react'
import style from './UploadPic.module.css'

import UserPic from '../../components/UserPic/UserPic'
import Modal from './UploadPicModal'

const UploadPic = ({url, save}) => {
  const [modal, setModal] = useState(false)
  const [newUrl, setNewUrl] = useState(url)
  const handleUpload = (e) => {
    const file = e.target.files[0]
    const img = URL.createObjectURL(file)
    setNewUrl(img)
    e.target.value = null
  }

  return(
    <div className={style.wrap}>
      <button type='button' className={style.edit} onMouseDown={(e) => e.preventDefault()} onClick={() => setModal(true)} aria-label='Edit photo'>
        <UserPic url={url}/>
      </button>
      {modal ?
        <Modal close={() => setModal(false)} upload={handleUpload} url={newUrl} setUrl={setNewUrl} save={save}/>
      : null}
    </div>
  )
}

export default UploadPic
