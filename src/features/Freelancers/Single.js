import {useState, useRef, useLayoutEffect, useEffect} from 'react'

import style from './Single.module.css'

import UserPic from '../../components/UserPic/UserPic'
import Certifications from '../../components/Certifications/Certifications'

const Single = ({data, addOffset, removeOffset, isLast}) => {
  const expandContent = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const {height} = expandContent.current.getBoundingClientRect()
    setHeight(height)
  }, [expandContent])

  const toggleExpand = () => {
    if (expanded) {
      removeOffset(data.index)
    } else if (!expanded && !isLast) {
      addOffset({amount: height, index: data.index})
    }
    setExpanded(!expanded)
  }

  useEffect(() => {
    return () => removeOffset(data.index)
  }, [removeOffset, data.index])

  return(
    <li
      className={`${style.wrap} ${expanded ? style.expanded : ''} ${isLast ? style.last : ''}`}
      style={isLast ? {transform: `translateY(${data.offset}px)`, height: !expanded ? 120 : 120 + height} : {transform: `translateY(${data.offset}px)`}}
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

      <div ref={expandContent} className={style.expandContent} style={{opacity: expanded ? 1 : 0}}>
        <span className={style.aboutTitle}>
          About:
        </span>
        <p className={style.about}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        </p>

        <span className={style.certificationsTitle}>
          Certifications ({4}/6):
        </span>
        <Certifications list={[0,0,0,0,0,0,0]}/>

        <span className={style.contactTitle}>
          Contact:
        </span>
        <a className={style.contact} href={`mailto:${data.email}`}>{data.email}</a>
      </div>
    </li>
  )
}

export default Single
