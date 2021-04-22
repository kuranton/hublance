import style from './Footer.module.css'

import Button from '@components/Button'

const Footer = ({onCancel, onSave}) => {
  const save = () => {
    onSave()
    onCancel()
  }
  return(
    <div className={style.footer}>
      <Button className={style.cancel} onClick={onCancel}>Cancel</Button>
      <Button primary className={style.save} onClick={save}>Save</Button>
    </div>
  )
}

export default Footer
