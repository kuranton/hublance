import {forwardRef, useImperativeHandle, useState, useRef, useEffect} from 'react'

import Slider from '../../components/Slider/Slider'

import style from './UploadPicCanvas.module.css'

const radius = 110 //round pic radius after crop

const Canvas = forwardRef(({url, setUrl, close, cropping}, ref) => {
  const canvas = useRef(null)
  const [img, setImg] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [imgData, setImgData] = useState({})
  const [dragging, setDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState({})
  const [zoomAmount, setZoomAmount] = useState(0)
  const [rotation, setRotation] = useState(0.5)

  useEffect(() => {
    if (!url) {
      const ctx = canvas.current.getContext('2d')
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
      canvas.current.style.cursor = null
      return
    }
    const image = new Image()
    setLoaded(false)
    setZoomAmount(0)
    setRotation(0.5)
    image.onload = () => {
      const {width, height} = image
      if (!canvas || !canvas.current) {
        return
      }
      const ctx = canvas.current.getContext('2d')
      const ratio = radius*2/Math.min(width, height)
      const dWidth = width*ratio
      const dHeight = height*ratio
      const dx = (canvas.current.width - dWidth)/2
      const dy = (canvas.current.height - dHeight)/2
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
      ctx.drawImage(image, dx, dy, dWidth, dHeight)
      setImg(image)
      setImgData({dx, dy, dWidth, dHeight, aspectRatio: width/height})
      setLoaded(true)
      canvas.current.style.cursor = 'pointer'
    }
    image.src = url
  }, [url])

  const handleWheel = (e) => {
    if (!loaded || !img) {
      return
    }
    const increment = e.deltaY > 0 ? 0.05 : -0.05
    zoom(zoomAmount + increment)
  }

  const zoom = (amount) => {
    amount = Math.min(Math.max(amount, 0), 1)
    setZoomAmount(amount)
    const ctx = canvas.current.getContext('2d')
    if (!img) {
      return
    }
    const {width, height} = img
    let {dx, dy, dWidth, dHeight, aspectRatio} = imgData
    const min = radius * 2
    const max = Math.min(width, height)
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
    setImgData({dx, dy, dWidth, dHeight, aspectRatio})
  }

  const rotate = (amount) => {
    setRotation(amount)
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
    if (!url) {
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
    setDragStartPos({x: e.clientX, y: e.clientY})
    setDragging(true)
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
    setDragging(false)
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
    setImgData({dx, dy, dWidth, dHeight, aspectRatio})
  }

  useImperativeHandle(ref, () => ({
    save: async () => {
      const offscreen = new OffscreenCanvas(radius*2, radius*2)
      const octx = offscreen.getContext('2d')
      const sx = canvas.current.width/2 - radius
      const sy = canvas.current.height/2 - radius

      octx.drawImage(canvas.current, sx, sy, radius*2, radius*2, 0, 0, radius*2, radius*2)
      const blob = await offscreen.convertToBlob()
      const dataUrl = URL.createObjectURL(blob)
      setUrl(dataUrl)
      close()
    }
  }))

  return(
    <>
      <canvas ref={canvas} width={704} height={260} onWheel={handleWheel} onMouseDown={dragStart} onMouseMove={drag} onMouseUp={dragEnd} onMouseLeave={dragEnd}/>
      {cropping ?
        <div className={style.controls}>
          <Slider title='Zoom' onChange={zoom} filled={zoomAmount}/>
          <Slider title='Straighten' onChange={rotate} filled={rotation}/>
        </div>
      : null}
    </>
  )
})

export default Canvas
