import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {open, setWarning, setUrl, setCropping, setZoomAmount, setRotation, setImgData} from '@store/imageEditorSlice'

import style from './ImageEditor.module.css'

import UserPic from '@components/UserPic/UserPic'
import Modal from './Modal'

const [canvasWidth, canvasHeight, radius] = [704, 260, 110]

const UploadPic = () => {
  const [img, setImg] = useState(null)
  const dispatch = useDispatch()
  const photoUrl = useSelector(store => store.signup.photoUrl)
  const isOpen = useSelector(store => store.imageEditor.isOpen)
  const url = useSelector(store => store.imageEditor.url)

  useEffect(() => {
    if (!url && photoUrl) {
      dispatch(setUrl(photoUrl))
    }
  }, [photoUrl])

  useEffect(() => {
    const image = new Image()
    image.onload = () => {
      if (image.width < 220 || image.height < 220) {
        dispatch(setWarning('Image is too small'))
        return
      }
      const {width, height} = image
      const ratio = radius*2/Math.min(width, height)
      const dWidth = width*ratio
      const dHeight = height*ratio
      const dx = (canvasWidth - dWidth)/2
      const dy = (canvasHeight - dHeight)/2
      dispatch(setImgData({dx, dy, dWidth, dHeight, aspectRatio: width/height}))
      setImg(image)
      dispatch(setWarning(''))
      dispatch(setCropping(true))
      dispatch(setZoomAmount(0))
      dispatch(setRotation(0.5))
    }
    image.src = url
  }, [url])

  return(
    <div className={style.wrap}>
      <button type='button' className={style.edit} onMouseDown={(e) => e.preventDefault()} onClick={() => dispatch(open())} aria-label='Edit photo'>
        <UserPic url={photoUrl}/>
      </button>
      {isOpen ?
        <Modal img={img}/>
      : null}
    </div>
  )
}

export default UploadPic
