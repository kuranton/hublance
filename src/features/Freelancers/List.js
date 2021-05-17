import React, {useRef, useEffect, useMemo, useState, useCallback, memo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEventListener} from '@util/useEventListener'

import {fetchFreelancers} from '@store/freelancersSlice'

import style from './List.module.css'

import Scrollbar from '@components/Scrollbar'

import Filter from '@features/Filter'
import Join from '@features/Signup/Join'
import Form from '@features/Signup/Form'
import Profile from '@features/Profile'

import Single from './Single'

const List = ({defaultOffset = 0}) => {
  const body = useRef(null)
  const [scroll, setScroll] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [profileOffset, setProfileOffset] = useState(120)

  const dispatch = useDispatch()
  const freelancers = useSelector(store => store.freelancers.list)
  const contentHeight = Math.max(useSelector(store => store.freelancers.totalHeight) + profileOffset, 120)
  const started = useSelector(store => store.signup.started)
  const visible = useSelector(store => store.signup.visible)
  const editing = useSelector(store => store.profile.editing)

  const handleWheel = (e) => {
    e.preventDefault()
    requestAnimationFrame(() => setScroll(scroll => Math.max(Math.min(contentHeight - 800, scroll + e.deltaY), 0)))
  }

  useEventListener('wheel', handleWheel, body.current)

  useEffect(() => {
    dispatch(fetchFreelancers())
  }, [dispatch])

  useEffect(() => {
    if (!visible) {
      setProfileOffset(-1)
    } else if (!editing) {
      if (started) {
        setProfileOffset(316)
      } else {
        setProfileOffset(121)
      }
    }
  }, [visible, editing, started])

  return(
    <div className={style.wrap}>
      <div className={style.header}>
        <Filter/>
        <div className={style.tableHead}>
          <span>Photo</span>
          <span>Title</span>
          <span>Name</span>
          <span>Hourly rate</span>
          <span>Country</span>
        </div>
      </div>

      <div ref={body} className={style.body}>
        <ul className={style.list} style={{height: contentHeight, transform: `translateY(${-scroll}px)`, transition: dragging ? 'none' : null}}>
          {visible ?
            editing ?
              <Profile setOffset={setProfileOffset}/>
            :
            started ?
              <Form/>
            :
            <Join setOffset={setProfileOffset}/>
          : null
          }
          {!freelancers.find(freelancer => freelancer.visible) ?
            <li className={style.noMatches}>No matches, please try using less filters.</li>
          : null}
          {freelancers.map((freelancer, index) =>
            <Single
              key={freelancer.index}
              data={freelancer}
              setScroll={setScroll}
              scroll={scroll}
              listHeight={contentHeight}
              isLast={index > freelancers.length - 3}
              offset={profileOffset}
            />
          )}
        </ul>
        <Scrollbar
          scroll={scroll}
          setScroll={setScroll}
          wrapHeight={800}
          contentHeight={contentHeight}
          maxHeight={800}
          dragging={dragging}
          setDragging={setDragging}
          style={{right: 25}}
        />
      </div>

      <div className={style.footer}/>
    </div>
  )
}


function compare(prevProps, nextProps) {
  return true
}

export default React.memo(List, compare)
