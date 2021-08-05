import React, {useRef, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEventListener} from '@util/useEventListener'

import {loadFreelancers} from '@store/freelancersSlice'

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
  const [oldFreelancers, setOldFreelancers] = useState([])
  const [transform, setTransform] = useState(0)

  const dispatch = useDispatch()
  const freelancers = useSelector(store => store.freelancers.list)
  const loading = useSelector(store => store.freelancers.loading)
  const loadingAdditional = useSelector(store => store.freelancers.loadingAdditional)
  const contentHeight = Math.max(useSelector(store => store.freelancers.totalHeight) + profileOffset, 120)
  const started = useSelector(store => store.profile.status.signupStarted)
  const visible = useSelector(store => store.profile.status.visible)
  const editing = useSelector(store => store.profile.status.editing)
  const signedUp = useSelector(store => store.profile.status.signedUp)

  const handleWheel = (e) => {
    e.preventDefault()
    requestAnimationFrame(() => setScroll(scroll => Math.max(Math.min(contentHeight - 800, scroll + e.deltaY), 0)))
  }

  useEventListener('wheel', handleWheel, body.current)

  useEffect(() => {
    dispatch(loadFreelancers({}))
  }, [dispatch])

  useEffect(() => {
    if (!visible || (!editing && signedUp)) {
      setProfileOffset(-1)
    } else if (!editing) {
      if (started) {
        setProfileOffset(316)
      } else {
        setProfileOffset(121)
      }
    }
  }, [visible, editing, started, signedUp])

  useEffect(() => {
    setOldFreelancers(freelancers)
    if (loading) {
      setScroll(0)
    }
  }, [loading, freelancers, setScroll])

  useEffect(() => {
    const max = contentHeight - 800
    if (scroll > max * 0.9 && !loading && !loadingAdditional) {
      dispatch(loadFreelancers({count: 20, add: true}))
    }
  }, [dispatch, scroll, contentHeight, loading, loadingAdditional])

  return(
    <div className={style.wrap}>
      <Filter setTransform={setTransform}/>

      <div className={style.tableWrap} style={{transform: `translateY(${transform}px)`}}>
        <div className={style.header}>
          <div className={style.tableHead}>
            <span>Photo</span>
            <span>Title</span>
            <span>Name</span>
            <span>Hourly rate</span>
            <span>Country</span>
          </div>
        </div>

        <div ref={body} className={style.body}>
          <div className={style.listWrap} style={{height: contentHeight, transform: `translateY(${-scroll}px)`, transition: dragging ? 'none' : null}}>
            <ul className={style.list} style={{zIndex: 1}}>
              <div className={style.background} style={{transform: `scaleY(${profileOffset/10})`}}/>
              {visible ?
                editing ?
                  <Profile setOffset={setProfileOffset} scroll={scroll}/>
                :
                started ?
                  <Form/>
                :
                !signedUp ?
                  <Join setOffset={setProfileOffset}/>
                : null
              : null}
            </ul>
            <div className={style.separator} style={{transform: `translateY(${profileOffset}px)`}}/>
            <ul
              className={style.list}
              style={loading ? {filter: 'blur(2px)', opacity: 1} : {opacity: 0}}
            >
              {!oldFreelancers.find(freelancer => freelancer.visible) ?
                <li className={style.noMatches} style={{transform: `translateY(${profileOffset}px)`}}>No matches, please try using less filters.</li>
              : null}
              {oldFreelancers.map((freelancer, index) =>
                <Single
                  key={freelancer.index}
                  data={freelancer}
                  setScroll={setScroll}
                  scroll={scroll}
                  listHeight={contentHeight}
                  offset={profileOffset}
                  loading={loading}
                />
              )}
            </ul>
            <ul
              className={style.list}
              style={loading ? {opacity: 0} : {opacity: 1, animationName: style.load}}
            >
              {!freelancers.find(freelancer => freelancer.visible) ?
                <li className={style.noMatches} style={{transform: `translateY(${profileOffset}px)`}}>No matches, please try using less filters.</li>
              : null}
              {freelancers.map((freelancer, index) =>
                <Single
                  key={freelancer.index}
                  data={freelancer}
                  setScroll={setScroll}
                  scroll={scroll}
                  listHeight={contentHeight}
                  offset={profileOffset}
                  loading={loading}
                />
              )}
            </ul>

          </div>
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
    </div>
  )
}


function compare(prevProps, nextProps) {
  return true
}

export default React.memo(List, compare)
