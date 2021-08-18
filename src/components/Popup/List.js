import {useRef, useState, useEffect} from 'react'
import {useEventListener} from '@util/useEventListener'
import {getTextWidth} from '@util/getTextWidth'

import style from './List.module.css'

import Scrollbar from '@components/Scrollbar'
import Item from './Item'
import NoMatches from './NoMatches'

const List = ({visible, list, search, height, setHeight, selected, add, remove, set, multiple = true, searchFields}) => {
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
      let visible = false
      if (searchFields) {
        outerLoop: for (var i=0; i < searchFields.length; i++) {
          const field = searchFields[i]
          if (Array.isArray(item[field])) {
            for (var j=0; j<item[field].length; j++) {
              if (item[field][j].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                visible = true
                break outerLoop
              }
            }
          } else if (typeof item[field] === 'string') {
            if (item[field].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
              visible = true
              break
            }
          }
        }
      } else {
        visible = item.toLowerCase().indexOf(search.toLowerCase()) !== -1
      }

      let data = {visible, offset}
      if (typeof item === 'string') {
        data = {
          ...data,
          name: item
        }
      } else {
        data = {
          ...data,
          ...item
        }
      }

      if (visible) {
        offset += 46
        if (searchFields && getTextWidth(data.name) > 110) {
          offset += 23
        }
      }
      return data
    })
    offset = Math.max(offset, 46)
    setContentHeight(offset)
    setFiltered(arr)
    setScroll(scroll => Math.max(Math.min(offset - 317, scroll), 0))
    const height = Math.min(offset, 317)
    setHeight(height + 24) //24 is padding
  }, [visible, search, setHeight, list, searchFields])

  return(
    <div style={{position: 'relative'}}>
      <ul ref={listRef} className={style.list} style={{transform: `translateY(${-scroll}px)`, height: contentHeight, transition: dragging ? 'none' : null}}>
        <NoMatches visible={!filtered.find(item => item.visible)}/>
        {filtered.map((item, index) => (
          <Item key={item.name} selected={selected.indexOf(item.content) !== -1} onSelect={() => select(item.name)} multiple={multiple} data={item}/>
        ))}
      </ul>
      <Scrollbar scroll={scroll} setScroll={setScroll} wrapHeight={height - 24} contentHeight={contentHeight} maxHeight={317} dragging={dragging} setDragging={setDragging}/>
    </div>
  )
}

export default List
