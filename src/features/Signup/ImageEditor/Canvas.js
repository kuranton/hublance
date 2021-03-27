import {forwardRef, useImperativeHandle, useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setZoomAmount, setRotation, setImgData, setDragging, setDragStartPos, close} from '@store/imageEditorSlice'
import {setPhotoUrl} from '../signupSlice'

import Slider from '@components/Slider/Slider'

import style from './Canvas.module.css'

const radius = 110 //round pic radius after crop

const Canvas = forwardRef(({img}, ref) => {
  const canvas = useRef(null)

  const dispatch = useDispatch()
  const {imgData, cropping} = useSelector(store => store.imageEditor)
  const {dragging, dragStartPos, zoomAmount, rotation} = useSelector(store => store.imageEditor.canvas)

  useEffect(() => {
    if (!canvas || !canvas.current) {
      return
    }
    if (!img) {
      const ctx = canvas.current.getContext('2d')
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
      canvas.current.style.cursor = null
      return
    }

    const ctx = canvas.current.getContext('2d')
    const {dx, dy, dWidth, dHeight} = imgData
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.drawImage(img, dx, dy, dWidth, dHeight)

    canvas.current.style.cursor = 'pointer'
  }, [img])

  const handleWheel = (e) => {
    if (!img || !cropping) {
      return
    }
    const increment = e.deltaY > 0 ? 0.05 : -0.05
    zoom(zoomAmount + increment)
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
    const ctx = canvas.current.getContext('2d')
    if (!img) {
      return
    }

    let {dx, dy, dWidth, dHeight, aspectRatio} = imgData
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
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.translate(canvas.current.width/2, canvas.current.height/2)
    ctx.rotate(Math.PI/2*(rotation-0.5))
    ctx.translate(canvas.current.width/-2, canvas.current.height/-2)
    ctx.drawImage(img, dx, dy, dWidth, dHeight)
    ctx.resetTransform()

    dispatch(setImgData({dx, dy, dWidth, dHeight}))
  }

  const rotate = (amount) => {
    dispatch(setRotation(amount))
    const {dx, dy, dWidth, dHeight} = imgData
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.translate(canvas.current.width/2, canvas.current.height/2)
    ctx.rotate(Math.PI/2*(rotation-0.5))
    ctx.translate(canvas.current.width/-2, canvas.current.height/-2)
    ctx.drawImage(img, dx, dy, dWidth, dHeight)
    ctx.resetTransform()
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
    dispatch(setDragStartPos({x: e.clientX, y: e.clientY}))
    dispatch(setDragging(true))
  }

  const drag = (e) => {
    e.preventDefault()
    if (!dragging) {
      return
    }
    let {dx, dy, dWidth, dHeight} = imgData
    const diffX = dragStartPos.x - e.clientX
    const diffY = dragStartPos.y - e.clientY
    const ctx = canvas.current.getContext('2d')
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
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.translate(canvas.current.width/2, canvas.current.height/2)
    ctx.rotate(Math.PI/2*(rotation-0.5))
    ctx.translate(canvas.current.width/-2, canvas.current.height/-2)
    ctx.drawImage(img, dx, dy, dWidth, dHeight)
    ctx.resetTransform()
  }

  const dragEnd = (e) => {
    e.preventDefault()
    if (!dragging) {
      return
    }
    dispatch(setDragging(false))
    let {dx, dy, dWidth, dHeight, aspectRatio} = imgData
    const diffX = dragStartPos.x - e.clientX
    const diffY = dragStartPos.y - e.clientY
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
    dispatch(setImgData({dx, dy, dWidth, dHeight, aspectRatio}))
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
      dispatch(close())
    }
  }))

  return(
    <>
      <canvas ref={canvas} width={704} height={260} onWheel={handleWheel} onMouseDown={dragStart} onMouseMove={drag} onMouseUp={dragEnd} onMouseLeave={dragEnd}/>
      {cropping ?
        <div className={style.controls}>
          <p className={style.instruction}>Drag to reposition photo</p>
          <Slider title='Zoom' onChange={zoom} filled={zoomAmount}/>
          <Slider title='Straighten' onChange={rotate} filled={rotation}/>
        </div>
      : null}
    </>
  )
})

export default Canvas
