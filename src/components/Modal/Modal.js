import {useState, useEffect, useLayoutEffect, useMemo, useRef, forwardRef, useImperativeHandle} from 'react'
import {Portal} from 'react-portal'

import style from './Modal.module.css'

const Modal = forwardRef(({title, children, close, positionRef}, ref) => {
  const modalRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [scale, setScale] = useState({x: 0, y: 0})

  const styles = useMemo(() => {
    if (visible) {
      return({
        transform: `translate(-50%, -50%) scale(1, 1)`,
        opacity: 1
      })
    } else {
      const rect = positionRef.current.getBoundingClientRect()
      const docWidth = document.body.clientWidth
      return({
        transform: `translate(${rect.left - docWidth/2}px, ${rect.top - window.innerHeight/2}px) scale(0.1, 0.1)`,
        opacity: 0
      })
    }
  }, [visible, positionRef.current, modalRef.current])

  const onClose = () => {
    setVisible(false)
    setClosing(true)
  }

  useImperativeHandle(ref, () => ({
    onClose
  }))

  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    const preventScroll = (e) => {
      e.preventDefault()
    }
    window.addEventListener('keydown', handleKeypress)
    document.body.addEventListener('wheel', preventScroll, {passive: false})

    return () => {
      window.removeEventListener('keydown', handleKeypress)
      document.body.removeEventListener('wheel', preventScroll)
    }
  }, [onClose])

  useLayoutEffect(() => {
    setTimeout(() => setVisible(true), 0)
    // return clearTimeout(timeout)
  }, [])

  useEffect(() => {
    let timeout
    if (closing) {
      timeout = setTimeout(close, 250)
    }
    return () => clearTimeout(timeout)
  }, [closing])

  return(
    <Portal>
      <div className={style.background} onClick={onClose} style={{opacity: visible ? 1 : 0}}/>
      <div className={style.modal} style={styles}>
        {title ?
          <header className={style.header}>
            <h2 className={style.title}>{title}</h2>
          </header>
        : null}
        <button type='button' className={style.close} onClick={onClose}>Close</button>
        {children}
      </div>
    </Portal>
  )
})

export default Modal
