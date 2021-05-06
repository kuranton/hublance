import {useRef, useEffect} from 'react'

import style from './Header.module.css'

const Header = ({searchVisible, search, setSearch}) => {
  const input = useRef(null)

  useEffect(() => {
    if (searchVisible) {
      input.current.focus()
    }
  }, [searchVisible])

  return(
    <div className={`${style.wrap} ${!searchVisible ? style.searchHidden : ''}`}>
      <input ref={input} type='text' className={style.input} placeholder='Search' onChange={e => setSearch(e.target.value)} value={search}/>
    </div>
  )
}

export default Header
