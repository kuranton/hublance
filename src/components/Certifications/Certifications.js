import style from './Certifications.module.css'

import Carousel from '@components/Carousel'
import Tooltip from '@components/Tooltip'

const Arrow = ({left = false}) => (
  <span className={style.arrow} style={left ? {transform: 'rotate(180deg)'} : {}}/>
)

const Certifications = ({list, scroll}) => {
  return(
    <div className={style.wrap}>
      <Carousel
        slideWidth={56}
        slideMargin={30}
        buttonWidth={20}
        buttonLeft={<Arrow left={true}/>}
        buttonRight={<Arrow/>}
      >
        {list.map(item => (
          <div key={item.id} className={`${style.certification} ${style[item.id]}`}>
            <Tooltip scroll={scroll}>
              {item.name}
            </Tooltip>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Certifications
