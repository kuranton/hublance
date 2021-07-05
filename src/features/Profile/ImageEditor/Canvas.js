import {forwardRef, useImperativeHandle, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setImgData, setDragging, setWarning} from '@store/imageEditorSlice'
import {setPhotoUrl} from '@store/profileSlice'

import style from './Canvas.module.css'

const Canvas = forwardRef(({img, zoom, radius, onClose}, ref) => {
  const canvas = useRef(null)

  const dispatch = useDispatch()
  const {imgData, cropping} = useSelector(store => store.imageEditor)
  const {dragging, zoomAmount, rotation} = useSelector(store => store.imageEditor.canvas)

  useEffect(() => {
    if (!canvas || !canvas.current) {
      return
    }

    const ctx = canvas.current.getContext('2d')
    if (!img) {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
      canvas.current.style.cursor = null
      return
    }

    const {dx, dy, dWidth, dHeight} = imgData
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.translate(canvas.current.width/2, canvas.current.height/2)
    ctx.rotate(Math.PI/2*(rotation-0.5))
    ctx.translate(canvas.current.width/-2, canvas.current.height/-2)
    ctx.drawImage(img, dx, dy, dWidth, dHeight)
    ctx.resetTransform()

    dispatch(setWarning(''))

    canvas.current.style.cursor = 'pointer'
  }, [img, imgData, rotation, dispatch])

  const handleWheel = (e) => {
    if (!img || !cropping) {
      return
    }
    const increment = e.deltaY > 0 ? 0.05 : -0.05
    zoom(zoomAmount + increment)
  }

  const dragStart = (e) => {
    if (!img || !cropping) {
      return
    }
    const {dx, dy, dWidth, dHeight} = imgData
    const rect = canvas.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (
      x < dx || x > dx + dWidth ||
      y < dy || y > dy + dHeight
    ) {
      return
    }
    dispatch(setDragging(true))
  }

  const drag = (e) => {
    e.preventDefault()
    if (!dragging) {
      return
    }
    let {dx, dy, dWidth, dHeight} = imgData
    const diffX = -e.movementX
    const diffY = -e.movementY
    dx -= diffX
    dy -= diffY
    if (dx > canvas.current.width/2 - radius) {
      dx = canvas.current.width/2 - radius
    } else if (dx < canvas.current.width/2 + radius - dWidth) {
      dx = canvas.current.width/2 + radius - dWidth
    }
    if (dy > canvas.current.height/2 - radius) {
      dy = canvas.current.height/2 - radius
    } else if (dy < canvas.current.height/2 + radius - dHeight) {
      dy = canvas.current.height/2 + radius - dHeight
    }
    dispatch(setImgData({dx, dy, dWidth, dHeight}))
  }

  const dragEnd = (e) => {
    e.preventDefault()
    if (!dragging) {
      return
    }
    dispatch(setDragging(false))
  }

  useImperativeHandle(ref, () => ({
    saveCrop: async () => {
      const offscreen = new OffscreenCanvas(radius*2, radius*2)
      const octx = offscreen.getContext('2d')
      const sx = canvas.current.width/2 - radius
      const sy = canvas.current.height/2 - radius

      octx.drawImage(canvas.current, sx, sy, radius*2, radius*2, 0, 0, radius*2, radius*2)
      const blob = await offscreen.convertToBlob()
      const objectUrl = URL.createObjectURL(blob)
      dispatch(setPhotoUrl(objectUrl))
    }
  }))

  return(
    <>
      <canvas ref={canvas} width={704} height={260} onWheel={handleWheel} onMouseDown={dragStart} onMouseMove={drag} onMouseUp={dragEnd} onMouseLeave={dragEnd}/>
      {cropping ?
        <p className={style.instruction}>Drag to reposition photo</p>
      : null}
    </>
  )
})

export default Canvas
