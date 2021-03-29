import {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {close, setUrl, setCropping, setWarning, setDraggingFile} from '@store/imageEditorSlice'
import {setPhotoUrl} from '@store/profileSlice'

import style from './Modal.module.css'

import Modal from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Canvas from './Canvas'

const accept = ['image/jpeg', 'image/jpg', 'image/png']

const UserPicModal = ({img}) => {
  const uploader = useRef(null)
  const canvas = useRef(null)

  const dispatch = useDispatch()
  const url = useSelector(store => store.imageEditor.url)
  const warning = useSelector(store => store.imageEditor.warning)
  const cropping = useSelector(store => store.imageEditor.cropping)
  const draggingFile = useSelector(store => store.imageEditor.draggingFile)

  const triggerUpload = () => {
    if (uploader && uploader.current) {
      uploader.current.click()
    }
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!(file instanceof File) || !accept.includes(file.type)) {
      dispatch(setWarning('Wrong file type'))
      return
    }
    if (file.size > 1024*1024*5) {
      dispatch(setWarning('File size is too large'))
      return
    }
    const newUrl = URL.createObjectURL(file)
    dispatch(setUrl(newUrl))
    e.target.value = null
    dispatch(setDraggingFile(false))
  }

  const saveCrop = () => {
    if (!url) {
      dispatch(close())
      return
    }
    canvas.current.saveCrop()
  }

  const deletePic = () => {
    dispatch(setPhotoUrl(''))
    dispatch(setUrl(''))
    dispatch(setCropping(false))
  }

  return(
    <Modal close={() => dispatch(close())} title='Edit Photo'>
      <div className={style.body} onDragEnter={() => dispatch(setDraggingFile(true))}>
        <Canvas ref={canvas} img={img}/>
        {!cropping ?
          <p className={style.limits}>JPEG/PNG, at least 220x220 pixels and not larger than 5Mb</p>
        :null}
        {!!warning ?
          <p className={style.warning}>{warning}</p>
        :null}
        <div className={style.overlay}/>
        <div className={`${style.circle} ${cropping ? style.cropping : ''}`}/>
        <input
          type='file'
          accept='image/png, image/jpeg'
          name='profile-pic'
          ref={uploader}
          className={style.uploader}
          onDragOver={() => dispatch(setDraggingFile(true))}
          onDragLeave={() => dispatch(setDraggingFile(false))}
          onChange={handleUpload}
          style={{pointerEvents: draggingFile ? 'all' : 'none'}}
        />
      </div>
      <div className={style.footer}>
        <div className={style.controls}>
          <button type='button' className={`${style.button} ${cropping ? style.active : ''}`} disabled={!url} onClick={() => dispatch(setCropping(!cropping))}>
            <span className={style.iconCrop}/>
            <span>Crop</span>
          </button>

          <button type='button' className={style.button} onClick={triggerUpload}>
            <span className={style.iconCamera}/>
            <span>Add Photo</span>
          </button>

          <button type='button' className={style.button} disabled={!url} onClick={deletePic}>
            <span className={style.iconBin}/>
            <span>Delete</span>
          </button>
        </div>
        <Button primary onClick={saveCrop}>Save</Button>
      </div>
    </Modal>
  )
}

export default UserPicModal
