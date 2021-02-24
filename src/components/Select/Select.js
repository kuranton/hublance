import {useState, useRef, useEffect} from 'react'
import style from './Select.module.css'

import Scroller from '../Scroller/Scroller'

const Select = ({searchable = false, placeholder, options, height = 200, value, onChange}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [optionsStyle, setOptionsStyle] = useState({})
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
    window.addEventListener('mousedown', handleBlur)
  }

  const handleBlur = (e) => {
    if (wrap && wrap.current && wrap.current.contains(e.target)) {
      return
    }
    setOpen(false)
    window.removeEventListener('mousedown', handleBlur)
  }

  useEffect(() => {
    return () => window.removeEventListener('mousedown', handleBlur)
  }, [])

  return(
    <div ref={wrap} className={style.wrap} onClick={handleClick}>

      {/* {value ?
        <input ref={input} className={style.search} type='text' value={search} placeholder={placeholder} onChange={(e) => setSearch(e.target.value)}/>
      : */}
      <span className={style.placeholder}>{value || placeholder}</span>
      {/* } */}

      {open ?
        <div className={style.options} style={optionsStyle}>
          <Scroller maxHeight={height} scrollbarStyle={{right: 3}}>
            {options.reduce((result, option) => {
              if (option.label.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                result.push(
                  <div className={style.option} key={option.value} onClick={() => onChange(option.value)}>{option.label}</div>
                )
              }
                return result
            },[])}
          </Scroller>
        </div>
      : null}

    </div>
  )
}

export default Select
