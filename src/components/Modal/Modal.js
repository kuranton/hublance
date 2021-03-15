import {useEffect} from 'react'
import {Portal} from 'react-portal'

import style from './Modal.module.css'

const Modal = ({title, children, close}) => {
  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.key === 'Escape') {
        close()
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
  }, [])
  return(
    <Portal>
      <div className={style.background} onClick={close}/>
      <div className={style.modal}>
        {title ?
          <header className={style.header}>
            <h2 className={style.title}>{title}</h2>
          </header>
        : null}
        <button type='button' className={style.close} onClick={close}>Close</button>
        {children}
      </div>
    </Portal>
  )
}

export default Modal
