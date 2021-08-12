import {useState, useRef, useEffect} from 'react'
import style from './Carousel.module.css'

const Carousel = ({children, slideWidth, slideMargin, buttonWidth, buttonLeft, buttonRight}) => {
  const [slide, setSlide] = useState(0)
  const [width, setWidth] = useState(0)
  const wrap = useRef({offsetWidth:0})
  const slidesToShow = Math.floor(width/(slideWidth + slideMargin))
  console.log(width, slideWidth, slideMargin, slidesToShow)
  const innerWrapWidth = slidesToShow * slideWidth + (slidesToShow - 1) * slideMargin
  const innerWrapTransform = slide > 0 ? (width - innerWrapWidth)/2 : 0

  useEffect(() => {
    const handleResize = () => {
      setWidth(wrap.current.offsetWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return(
    <div className={style.wrap} ref={wrap}>
      {slide > 0
        ? <button type='button' className={style.button} style={{position: 'absolute'}} onClick={() => setSlide(slide - 1)}>{buttonLeft}</button>
        : null
      }
      <div className={style.innerWrap} style={{width: innerWrapWidth, transform: `translateX(${innerWrapTransform}px)`}}>
        <div className={style.carousel} style={{width: (slideWidth + slideMargin) * children.length, transform: `translateX(${slide * -(slideWidth + slideMargin)}px)`}}>
          {children}
        </div>
      </div>
      {slide < (children.length - slidesToShow)
        ? <button type='button' className={style.button} onClick={() => setSlide(slide + 1)}>{buttonRight}</button>
        : null
      }
    </div>
  )
}

export default Carousel
