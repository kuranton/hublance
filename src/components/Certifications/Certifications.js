import style from './Certifications.module.css'

import Slider from '../../components/Slider/Slider'

const Arrow = ({left = false}) => (
  <span className={style.arrow} style={left ? {transform: 'rotate(180deg)'} : {}}/>
)

const Certifications = ({list}) => {
  return(
    <div className={style.wrap}>
      <Slider
        slideWidth={56}
        slideMargin={30}
        buttonWidth={20}
        buttonLeft={<Arrow left={true}/>}
        buttonRight={<Arrow/>}
      >
        {list.map((item, index) => (
          <div key={index} className={style.certification}/>
        ))}
      </Slider>
    </div>
  )
}

export default Certifications
