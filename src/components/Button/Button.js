import style from './Button.module.css'

const Button = ({primary, type, className, children, ...props}) => (
  <button
    type={type ? type : 'button'}
    className={`${primary ? style.primary : style.default} ${className ? className : ''}`}
    {...props}
  >
    {children}
  </button>
)

export default Button
