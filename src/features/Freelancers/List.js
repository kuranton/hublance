import React, {useRef, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEventListener} from '@util/useEventListener'

import {loadFreelancers, setNoMoreResults} from '@store/freelancersSlice'

import style from './List.module.css'

import Scrollbar from '@components/Scrollbar'

import Filter from '@features/Filter'
import Profile from '@features/Profile'

import Single from './Single'

const List = () => {
  const body = useRef(null)
  const timeout = useRef(null)
  const [scroll, setScroll] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [oldFreelancers, setOldFreelancers] = useState([])
  const [transform, setTransform] = useState(0)

  const dispatch = useDispatch()
  const filters = useSelector(store => store.filters)
  const freelancers = useSelector(store => store.freelancers.list)
  const noMoreResults = useSelector(store => store.freelancers.noMoreResults)
  const loading = useSelector(store => store.freelancers.loading)
  const loadingAdditional = useSelector(store => store.freelancers.loadingAdditional)
  const contentHeight = Math.max(useSelector(store => store.freelancers.totalHeight), 120)
  const authenticated = useSelector(store => store.auth.authenticated)

  const handleWheel = (e) => {
    const lowerBoundary = contentHeight - 800
    if ((scroll < lowerBoundary && e.deltaY >= 0) || (scroll > 0 && e.deltaY <= 0)) {
      e.preventDefault()
    }
    requestAnimationFrame(() => setScroll(scroll => Math.max(Math.min(lowerBoundary, scroll + e.deltaY), 0)))
  }

  useEventListener('wheel', handleWheel, body.current)

  useEffect(() => {
    dispatch(setNoMoreResults(false))
  }, [dispatch, filters])

  useEffect(() => {
    dispatch(loadFreelancers({}))
  }, [dispatch])

  useEffect(() => {
    setOldFreelancers(freelancers)
    if (loading) {
      setScroll(0)
    }
  }, [loading, freelancers, setScroll])

  useEffect(() => {
    const loadAdditional = () => {
      const max = contentHeight - 800
      if (scroll > max * 0.9 && !loading && !loadingAdditional && !noMoreResults) {
        dispatch(loadFreelancers({count: 20, add: true}))
      }
    }
    clearTimeout(timeout.current)
    timeout.current = setTimeout(loadAdditional, 100)
  }, [dispatch, scroll, contentHeight, loading, loadingAdditional, noMoreResults])

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
          <div className={style.listWrap} style={{height: contentHeight, transform: `translateY(${-scroll}px)`, transition: dragging ? 'none' : null}}>
            <ul className={style.list} style={{zIndex: 1}}>
              <div className={style.background}/>
              {authenticated ?
                <Profile scroll={scroll}/>
              : null}
            </ul>
            <ul
              className={style.list}
              style={loading ? {filter: 'blur(2px)', opacity: 1} : {opacity: 0}}
            >
              {!oldFreelancers.find(freelancer => freelancer.visible) && !authenticated ?
                <li className={style.noMatches}>No matches, please try using less filters.</li>
              : null}
              {oldFreelancers.map((freelancer, index) =>
                <Single
                  key={freelancer.index}
                  data={freelancer}
                  setScroll={setScroll}
                  scroll={scroll}
                  listHeight={contentHeight}
                  loading={loading}
                />
              )}
            </ul>
            <ul
              className={style.list}
              style={loading ? {opacity: 0} : {opacity: 1, animationName: style.load}}
            >
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
                  loading={loading}
                />
              )}
            </ul>

          </div>
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
