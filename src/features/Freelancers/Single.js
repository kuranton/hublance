import {useState} from 'react'

import style from './Single.module.css'

import UserPic from '../../components/UserPic/UserPic'
import Certifications from '../../components/Certifications/Certifications'

const Single = ({data}) => {
  const [expanded, setExpanded] = useState(false)
  return(
    <>
      <UserPic url={data.photoUrl} letter={data.name.substring(0, 1)}/>
      <div className={style.title}>{data.title}</div>
      <div>{data.name}</div>
      <div>{data.rate}</div>
      <div className={style.country}>{data.country}</div>
      <button
        className={style.buttonExpand}
        aria-label='expand'
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setExpanded(!expanded)}
        style={expanded ? {transform: 'rotate(180deg)'} : {}}
      >
        Expand
      </button>

      {expanded ?
        <>
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
        </>
      : null
      }
    </>
  )
}

export default Single
