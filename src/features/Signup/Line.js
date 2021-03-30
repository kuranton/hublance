import {useRef, useEffect, useState} from 'react'

import style from './Line.module.css'

import Clipboard from './Clipboard'

const Line = ({step}) => {
  const path = useRef({})
  const [length, setLength] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const filled = (step + 1) * 0.25

  useEffect(() => {
    if (!path.current || !path.current.getTotalLength) {
      return
    }
    setLength(path.current.getTotalLength())
    setTimeout(() => setLoaded(true), 0)
  }, [path])

  return(
    <div className={`${style.wrap} ${step > 2 ? style.complete : ''}`} style={!loaded ? {opacity: 0} : {}}>
      <span className={`${style.number} ${style.active}`}>1</span>
      <span className={`${style.number} ${step > 0 ? style.active : ''}`}>2</span>
      <span className={`${style.number} ${step > 1 ? style.active : ''}`}>3</span>

      <svg width="280" height="133" viewBox="0 0 280 133" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.svg}>
        <g filter="url(#filter0_f)">
          <ellipse cx="138.765" cy="66.6995" rx="67.8521" ry="11" transform="rotate(-15 138.765 66.6995)" fill="url(#paint0_linear)" fillOpacity="0.4"/>
        </g>
        <path fillRule="evenodd" clipRule="evenodd" d="M60.0319 69.5475C46.1201 66.1351 33.3077 69.7391 22.2638 80.6151C17.5418 85.2654 9.94405 85.2072 5.29378 80.4851C0.64351 75.7631 0.701691 68.1654 5.42373 63.5151C22.0255 47.1657 43.252 40.7202 65.7493 46.2385C73.3889 48.1124 79.6466 50.9848 84.9848 53.7521C87.1506 54.8748 88.9853 55.8738 90.6672 56.7896C93.4981 58.331 95.8962 59.6368 98.7121 60.9004C105.864 64.1099 113.635 66.0045 127.85 61.452C129.757 60.8415 132.152 59.6705 135.998 57.7907C136.818 57.3899 137.703 56.9569 138.665 56.4902C143.605 54.0913 149.794 51.2123 156.714 49.1226C170.945 44.8252 188.726 43.7836 206.995 55.7331C219.402 63.8482 229.552 66.1342 237.599 65.6919C245.679 65.2479 252.867 61.9847 259.195 56.8888C264.357 52.7319 271.911 53.5465 276.068 58.7081C280.225 63.8698 279.41 71.424 274.248 75.5809C264.852 83.1479 252.999 88.8818 238.916 89.6558C224.799 90.4316 209.664 86.1564 193.858 75.8181C183.196 68.8446 173.271 69.1933 163.652 72.0979C158.647 73.6094 153.875 75.7843 149.148 78.0796C148.489 78.3996 147.802 78.7375 147.095 79.0854C143.295 80.9543 138.912 83.1102 135.17 84.3085C114.982 90.7739 101.109 88.282 88.8862 82.7968C85.2889 81.1826 81.4549 79.104 78.0909 77.2803C76.5931 76.4683 75.1884 75.7068 73.9394 75.0593C69.412 72.7124 65.0593 70.7807 60.0319 69.5475Z" fill="white" stroke="url(#paint1_linear)" strokeLinecap="round"/>
        <g filter="url(#filter1_ii)">
          <path
            ref={path}
            d="M267.7,65.9c-10,7.9-19.4,10.3-26.7,11.5c-18,2.8-26.1-5.4-50-16c-20.1-8.9-41.7,3.6-54.3,9.3c-34.4,15.6-46.7-6.8-72-13c-18.2-4.5-35.2,0.6-49,14.2"
            stroke="url(#paint2_linear)"
            strokeWidth="25"
            strokeLinecap="round"
            strokeDasharray={length}
            strokeDashoffset={(-1 + filled)*length}
            style={loaded ? {transition: '300ms ease-out'} : {transition: 'none'}}
            clipPath="url(#clip1)"
          />
        </g>
        <defs>
          <filter id="filter0_f" x="32.3779" y="0.512909" width="212.774" height="132.373" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="19" result="effect1_foregroundBlur"/>
          </filter>
          <filter id="filter1_ii" x="1" y="33" width="278.436" height="68.218" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.66 0"/>
            <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
          </filter>
          <linearGradient id="paint0_linear" x1="81.2862" y1="75.9296" x2="87.3719" y2="38.7462" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF2126"/>
            <stop offset="0.6875" stopColor="#EE7C00"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="6.7666" y1="66.6403" x2="267.767" y2="66.6403" gradientUnits="userSpaceOnUse">
            <stop offset="0.0693016" stopColor="#EE7C00" stopOpacity="0"/>
            <stop offset="0.420408" stopColor="#EE7C00" stopOpacity="0.49"/>
            <stop offset="1" stopColor="#EE7C00" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="11.7666" y1="81.6402" x2="267.767" y2="66.6402" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EE7C00"/>
            <stop offset="1" stopColor="#FEB565"/>
          </linearGradient>
          <clipPath id="clip1">
            <path fillRule="evenodd" clipRule="evenodd" d="M60.0319 69.5475C46.1201 66.1351 33.3077 69.7391 22.2638 80.6151C17.5418 85.2653 9.94405 85.2072 5.29378 80.4851C0.64351 75.7631 0.701691 68.1653 5.42373 63.5151C22.0255 47.1656 43.252 40.7201 65.7493 46.2384C73.3889 48.1123 79.6466 50.9848 84.9848 53.7521C87.1506 54.8748 88.9853 55.8738 90.6672 56.7896C93.4981 58.331 95.8962 59.6368 98.7121 60.9004C105.864 64.1098 113.635 66.0045 127.85 61.452C129.757 60.8415 132.152 59.6705 135.998 57.7907C136.818 57.3899 137.703 56.9569 138.665 56.4902C143.605 54.0912 149.794 51.2122 156.714 49.1226C170.945 44.8252 188.726 43.7835 206.995 55.733C219.402 63.8482 229.552 66.1341 237.599 65.6919C245.679 65.2478 252.867 61.9847 259.195 56.8888C264.357 52.7319 271.911 53.5464 276.068 58.7081C280.225 63.8698 279.41 71.424 274.248 75.5809C264.852 83.1479 252.999 88.8818 238.916 89.6557C224.799 90.4315 209.664 86.1564 193.858 75.8181C183.196 68.8446 173.271 69.1933 163.652 72.0979C158.647 73.6093 153.875 75.7843 149.148 78.0795C148.489 78.3995 147.802 78.7375 147.095 79.0854C143.295 80.9542 138.912 83.1102 135.17 84.3085C114.982 90.7739 101.109 88.2819 88.8862 82.7968C85.2889 81.1825 81.4549 79.104 78.0909 77.2803C76.5931 76.4683 75.1884 75.7068 73.9394 75.0593C69.412 72.7123 65.0593 70.7806 60.0319 69.5475Z" fill="#ffffff"/>
          </clipPath>
        </defs>
      </svg>

      <Clipboard complete={step > 2}/>
    </div>
  )
}

export default Line
