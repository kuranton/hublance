import {useRef, useState, useEffect} from 'react'
import {useEventListener} from '@util/useEventListener'

import style from './List.module.css'

import Scrollbar from '@components/Scrollbar'
import Item from './Item'
import NoMatches from './NoMatches'

const List = ({visible, list, search, height, setHeight, selected, add, remove, set, multiple = true}) => {
  const listRef = useRef({})
  const [dragging, setDragging] = useState(false)
  const [scroll, setScroll] = useState(0)
  const [filtered, setFiltered] = useState([])
  const [contentHeight, setContentHeight] = useState(0)

  const select = (item) => {
    if (!multiple) {
      set(item)
      return
    }

    if (selected.indexOf(item) !== -1) {
      remove(item)
    } else {
      add(item)
    }
  }

  const handleWheel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newScroll = Math.max(Math.min(contentHeight - 317, scroll + e.deltaY/5), 0)
    setScroll(newScroll)
  }

  useEventListener('wheel', handleWheel, listRef.current)

  useEffect(() => {
    if (!visible) {
      return
    }
    let offset = 0
    const arr = list.map(item => {
      const visible = item.toLowerCase().indexOf(search.toLowerCase()) !== -1
      const data = {
        visible,
        offset,
        content: item
      }
      if (visible) {
        offset += 46
      }
      return data
    })
    offset = Math.max(offset, 46)
    setContentHeight(offset)
    setFiltered(arr)
    setScroll(scroll => Math.max(Math.min(offset - 317, scroll), 0))
    const height = Math.min(offset, 317)
    setHeight(height + 24) //24 is padding
  }, [visible, search, setHeight, list])

  return(
    <div style={{position: 'relative'}}>
      <ul ref={listRef} className={style.list} style={{transform: `translateY(${-scroll}px)`, height: contentHeight, transition: dragging ? 'none' : null}}>
        <NoMatches visible={!filtered.find(item => item.visible)}/>
        {filtered.map((item, index) => (
          <Item key={item.content} selected={selected.indexOf(item.content) !== -1} onSelect={() => select(item.content)} multiple={multiple} data={item}/>
        ))}
      </ul>
      <Scrollbar scroll={scroll} setScroll={setScroll} wrapHeight={height - 24} contentHeight={contentHeight} maxHeight={317} dragging={dragging} setDragging={setDragging}/>
    </div>
  )
}

export default List
