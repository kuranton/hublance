import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {open, setWarning, setCropping, setZoomAmount, setRotation, setImgData, setAspectRatio} from '@store/imageEditorSlice'

import style from './ImageEditor.module.css'

import UserPic from '@components/UserPic/UserPic'
import Modal from './Modal'

const [canvasWidth, canvasHeight, radius] = [704, 260, 110]

const UploadPic = () => {
  const positionRef = useRef(null)
  const [img, setImg] = useState(null)
  const dispatch = useDispatch()
  const photoUrl = useSelector(store => store.profile.data.photoUrl)
  const isOpen = useSelector(store => store.imageEditor.isOpen)
  const url = useSelector(store => store.imageEditor.url)

  useEffect(() => {
    if (!url) {
      setImg(null)
      return
    }
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
      dispatch(setAspectRatio(width/height))
      dispatch(setImgData({dx, dy, dWidth, dHeight}))
      setImg(image)
      dispatch(setWarning(''))
      dispatch(setCropping(true))
      dispatch(setZoomAmount(0))
      dispatch(setRotation(0.5))
    }
    image.crossOrigin = 'anonymous'
    image.src = url
  }, [url, dispatch])

  return(
    <div className={style.wrap}>
      <button ref={positionRef} type='button' className={style.edit} onMouseDown={(e) => e.preventDefault()} onClick={() => dispatch(open())} aria-label='Edit photo'>
        <UserPic url={photoUrl}/>
      </button>
      {isOpen ?
        <Modal img={img} positionRef={positionRef}/>
      : null}
    </div>
  )
}

export default UploadPic
