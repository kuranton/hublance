import {useState, useRef, useLayoutEffect, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {addOffset, removeOffset} from '@store/freelancersSlice'

import style from './Single.module.css'

import UserPic from '../../components/UserPic/UserPic'
import Certifications from '../../components/Certifications/Certifications'

const Single = ({data, setScroll, scroll, isLast, listHeight, loading}) => {
  const expandContent = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [height, setHeight] = useState(0)
  const [allowTransition, setAllowTransition] = useState(true)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (!expandContent.current) {
      return
    }
    const {height} = expandContent.current.getBoundingClientRect()
    setHeight(height)
  }, [expandContent])

  useLayoutEffect(() => {
    setTimeout(() => {
      setAllowTransition(!loading)
    }, 0)
  }, [loading])

  useEffect(() => {
    if (loading) {
      setExpanded(false)
    }
  }, [loading])

  const toggleExpand = () => {
    if (expanded) {
      dispatch(removeOffset({amount: height, index: data.index}))
      if (isLast) {
        setScroll(scroll => scroll - height)
      }
    } else {
      dispatch(addOffset({amount: height, index: data.index}))
      const overflow = height - 715 + data.offset - scroll
      if (overflow > 0) {
        setScroll(scroll => scroll + overflow)
      }
    }
    setExpanded(!expanded)
    setAnimating(true)
  }

  if (!data.visible) {
    return null
  }

  return(
    <li
      className={`${style.wrap} ${expanded ? style.expanded : ''}`}
      style={{transform: `translateY(${data.offset}px)`, transition: allowTransition ? null : 'none'}}
    >
      <div className={style.collapseContent}>
        <UserPic url={data.photoUrl} letter={data.name.substring(0, 1)}/>
        <div className={style.title}>{data.title}</div>
        <div>{data.name}</div>
        <div>{data.rate}</div>
        <div className={style.country}>{data.country}</div>
        <button
          className={style.buttonExpand}
          aria-label='expand'
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggleExpand}
          style={expanded ? {transform: 'rotate(180deg)'} : {}}
        >
          Expand
        </button>
      </div>

      {(expanded || !height || animating) ?
        <div ref={expandContent} className={style.expandContent} style={{animationName: expanded ? style.appear : style.disappear}} onAnimationEnd={() => setAnimating(false)}>
          <span className={style.aboutTitle}>
            About:
          </span>
          <p className={style.about}>
            {data.about}
          </p>

          <span className={style.certificationsTitle}>
            Certifications ({data.certifications.length}/6):
          </span>
          <Certifications list={data.certifications} containerRef={expandContent} scroll={scroll}/>

          <span className={style.contactTitle}>
            Contact:
          </span>
          <a className={style.contact} href={`mailto:${data.email}`}>{data.email}</a>
        </div>
      : null}
    </li>
  )
}

export default Single
