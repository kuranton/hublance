import {useState, useRef} from 'react'
import {useEventListener} from '@util/useEventListener'

import style from './Select.module.css'

import Scroller from '@components/Scroller'
import Popup from '@components/Popup'
import Header from '@components/Popup/Header'
import Footer from '@components/Popup/Footer'
import List from '@components/Popup/List'

const Select = ({searchable = false, placeholder, options, selected, height = 200, value, add, remove, className, onChange, ...props}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [bodyHeight, setHeight] = useState(0)
  const wrap = useRef(null)
  const input = useRef(null)

  const handleClick = () => {
    if (open) {
      return
    }
    setOpen(true)
    if (input && input.current) {
      input.current.focus()
    }
  }

  const handleBlur = (e) => {
    if (!open) {
      return
    }
    if (wrap && wrap.current && wrap.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }

  useEventListener('mousedown', handleBlur)

  return(
    <div ref={wrap} className={`${style.wrap} ${className ? className : ''}`} onClick={handleClick} {...props}>

      <span className={selected.length ? style.value : style.placeholder}>{selected[0] || placeholder}</span>
      <input type='hidden' value={value}/>

      <Popup visible={open}>
        <div className={style.popup}>
          <Header searchVisible={searchable} search={search} setSearch={setSearch}/>

          <div className={style.body} style={!searchable ? {transform: 'translateY(-31px)', zIndex: 1} : {}}>
            <div className={style.background} style={{transform: `scaleY(${(bodyHeight - (!searchable ? 24 : 0))/100})`}}/>
            <List visible={open} list={options} selected={selected} height={bodyHeight} setHeight={setHeight} search={search} add={add} remove={remove}/>
          </div>

          <div className={style.footer} style={{transform: `translateY(${bodyHeight}px)`}}/>
        </div>
      </Popup>

    </div>
  )
}

export default Select
