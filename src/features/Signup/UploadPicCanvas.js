import {forwardRef, useImperativeHandle, useState, useRef, useEffect} from 'react'

const radius = 110 //round pic radius after crop

const Canvas = forwardRef(({url, setUrl, close}, ref) => {
  const canvas = useRef(null)
  const [img, setImg] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [imgData, setImgData] = useState({})
  const [dragging, setDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState({})

  useEffect(() => {
    if (!url) {
      canvas.current.style.cursor = null
      return
    }
    const image = new Image()
    setLoaded(false)
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
    const increment = e.deltaY > 0 ? 20 : -20
    const ctx = canvas.current.getContext('2d')
    let {dx, dy, dWidth, dHeight, aspectRatio} = imgData
    if ((increment > 0 && (dWidth > img.width - 20 || dHeight > img.height - 20)) ||
      (increment < 0 && (dWidth < radius*2 + 20 || dHeight < radius*2 + 20))) {
      return
    }

    if (aspectRatio > 0) {
      dWidth += increment
      dHeight += increment/aspectRatio
      dx -= increment/2
      dy -= increment/2/aspectRatio
    } else {
      dHeight += increment
      dWidth += increment*aspectRatio
      dy -= increment/2
      dx -= increment/2*aspectRatio
    }
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.drawImage(img, dx, dy, dWidth, dHeight)
    setImgData({dx, dy, dWidth, dHeight, aspectRatio})
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
    ctx.drawImage(img, dx, dy, dWidth, dHeight)
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
    <canvas ref={canvas} width={704} height={260} onWheel={handleWheel} onMouseDown={dragStart} onMouseMove={drag} onMouseUp={dragEnd} onMouseLeave={dragEnd}/>
  )
})

export default Canvas
