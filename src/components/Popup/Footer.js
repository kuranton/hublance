import style from './Footer.module.css'

import Button from '@components/Button'

const Footer = ({onCancel, onSave, translateY, buttonsVisible}) => {
  const save = () => {
    onSave()
    onCancel()
  }
  return(
    <div className={`${style.footer} ${!buttonsVisible ? style.buttonsHidden : ''}`} style={{transform: `translateY(${translateY}px)`}}>
      <Button className={style.cancel} onClick={onCancel}>Cancel</Button>
      <Button primary className={style.save} onClick={save}>Save</Button>
    </div>
  )
}

export default Footer
