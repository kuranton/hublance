import style from './Label.module.css'

const Label = ({htmlFor, children}) => (
  <label htmlFor={htmlFor} className={style.label}>{children}</label>
)

export default Label
