import {useState} from 'react'
import style from './UploadPic.module.css'

import UserPic from '../../components/UserPic/UserPic'

const UploadPic = ({url}) => {
  const [open, setOpen] = useState(false)
  const [newUrl, setNewUrl] = useState(url)
  const handleUpload = (e) => {
    const file = e.target.files[0]
    const img = URL.createObjectURL(file)
    setNewUrl(img)
  }
  const handleLoad = () => {
    if (!newUrl) {
      return
    }
    URL.revokeObjectURL(newUrl)
  }
  return(
    <div className={style.wrap}>
      <input type='file' name='profile-pic' className={style.input} onChange={handleUpload}/>
      <UserPic url={newUrl} onLoad={handleLoad}/>
    </div>
  )
}

export default UploadPic
