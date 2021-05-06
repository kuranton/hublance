import {useRef, useState, useEffect, useCallback} from 'react'
import {useEventListener} from '@util/useEventListener'

import style from './List.module.css'

import Item from './Item'

const List = ({visible, list, search, height, setHeight, selected, add, remove, set, multiple = true}) => {
  const listRef = useRef({})
  const [scroll, setScroll] = useState(0)
  const [filtered, setFiltered] = useState([])
  const [contentHeight, setContentHeight] = useState(0)
  const [dragging, setDragging] = useState(false)

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
    setContentHeight(offset)
    setFiltered(arr)
    setScroll(scroll => Math.max(Math.min(offset - 317, scroll), 0))
    const height = Math.min(offset, 317)
    setHeight(height + 24) //24 is padding
  }, [visible, search, setHeight, list])

  const dragStart = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const drag = useCallback((e) => {
    if (!dragging) {
      return
    }
    setScroll(scroll => Math.max(Math.min(contentHeight - 317, scroll + e.movementY*contentHeight/(height - 24)), 0))
  }, [dragging, height, contentHeight])

  const dragEnd = useCallback(() => {
    if (!dragging) {
      return
    }
    setDragging(false)
  }, [dragging])

  useEventListener('mousemove', drag)
  useEventListener('mouseup', dragEnd)

  return(
    <>
      <ul ref={listRef} className={style.list} style={{transform: `translateY(${-scroll}px)`, height: contentHeight, transition: dragging ? 'none' : null}}>
        {filtered.map((item, index) => (
          <Item key={item.content} selected={selected.indexOf(item.content) !== -1} onSelect={() => select(item.content)} multiple={multiple} data={item}/>
        ))}
      </ul>
      <div className={`${style.track} ${height >= contentHeight ? style.hidden : ''}`}>
        <div className={style.scrollbar} style={{transform: `scaleY(${(height - 24)/10})`}}/>
        <div
          onMouseDown={dragStart}
          className={`${style.thumb} ${dragging ? style.dragging : ''}`}
          style={{transform: `translateY(${scroll/contentHeight*(height - 24)}px)`, transition: dragging ? 'none' : null}}
        >
          <div className={style.thumbTop}/>
          <div className={style.thumbMid} style={{transform: `scaleY(${(height - 24)/5 * (height - 24)/contentHeight - 2})`}}/>
          <div className={style.thumbBot} style={{transform: `translateY(${(height - 24) * (height - 24)/contentHeight - 5}px)`}}/>
        </div>
      </div>
    </>
  )
}

export default List
