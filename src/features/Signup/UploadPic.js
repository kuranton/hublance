import {useState} from 'react'
import style from './UploadPic.module.css'

import UserPic from '../../components/UserPic/UserPic'
import Modal from './UploadPicModal'

const UploadPic = ({url}) => {
  const [modal, setModal] = useState(false)
  const [newUrl, setNewUrl] = useState(url)
  const handleUpload = (e) => {
    const file = e.target.files[0]
    const img = URL.createObjectURL(file)
    setNewUrl(img)
    e.target.value = null
  }
  const handleLoad = () => {
    if (!newUrl) {
      return
    }
    // URL.revokeObjectURL(newUrl)
  }
  
  return(
    <div className={style.wrap}>
      <UserPic url={newUrl} onLoad={handleLoad}/>
      <button type='button' className={style.edit} onClick={() => setModal(true)}>Edit Photo</button>
      {modal ?
        <Modal close={() => setModal(false)} upload={handleUpload} url={newUrl} setUrl={setNewUrl}/>
      : null}
    </div>
  )
}

export default UploadPic
