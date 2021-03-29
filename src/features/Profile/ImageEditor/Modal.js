import {useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {close, setUrl, setCropping, setWarning, setDraggingFile, setZoomAmount, setImgData} from '@store/imageEditorSlice'
import {setPhotoUrl} from '@store/profileSlice'

import style from './Modal.module.css'

import Modal from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Canvas from './Canvas'
import Controls from './Controls'

const accept = ['image/jpeg', 'image/jpg', 'image/png']

const UserPicModal = ({img}) => {
  const radius = 110 //round pic radius after crop

  const uploader = useRef(null)
  const canvas = useRef(null)

  const dispatch = useDispatch()
  const url = useSelector(store => store.imageEditor.url)
  const warning = useSelector(store => store.imageEditor.warning)
  const cropping = useSelector(store => store.imageEditor.cropping)
  const draggingFile = useSelector(store => store.imageEditor.draggingFile)
  const imgData = useSelector(store => store.imageEditor.imgData)
  const aspectRatio = useSelector(store => store.imageEditor.aspectRatio)

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
    dispatch(setWarning(''))
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
    dispatch(setWarning(''))
  }

  const zoom = (amount) => {
    const {width, height} = img
    const min = radius * 2
    const max = Math.min(width, height)
    if (min === max) {
      return
    }
    amount = Math.min(Math.max(amount, 0), 1)
    dispatch(setZoomAmount(amount))
    if (!img) {
      return
    }

    let {dx, dy, dWidth, dHeight} = imgData
    const diff = max - min
    let newWidth, newHeight
    if (aspectRatio < 1) {
      newWidth = min + diff*amount
      newHeight = (min + diff*amount)/aspectRatio
    } else {
      newWidth = (min + diff*amount)*aspectRatio
      newHeight = min + diff*amount
    }

    dx -= (newWidth - dWidth)/2
    dy -= (newHeight - dHeight)/2

    if (dx > canvas.current.width/2 - radius) {
      dx = canvas.current.width/2 - radius
    } else if (dx < canvas.current.width/2 + radius - newWidth) {
      dx = canvas.current.width/2 + radius - newWidth
    }
    if (dy > canvas.current.height/2 - radius) {
      dy = canvas.current.height/2 - radius
    } else if (dy < canvas.current.height/2 + radius - newHeight) {
      dy = canvas.current.height/2 + radius - newHeight
    }
    dWidth = newWidth
    dHeight = newHeight

    dispatch(setImgData({dx, dy, dWidth, dHeight}))
  }

  return(
    <Modal close={() => dispatch(close())} title='Edit Photo'>
      <div className={style.body} onDragEnter={() => dispatch(setDraggingFile(true))}>
        <Canvas ref={canvas} img={img} zoom={zoom} radius={radius}/>
        {!cropping ?
          <p className={style.limits}>JPEG/PNG, at least 220x220 pixels and not larger than 5Mb</p>
        : null}
        {!!warning ?
          <p className={style.warning}>{warning}</p>
        : null}
        {cropping ?
          <Controls zoom={zoom}/>
        : null}
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
