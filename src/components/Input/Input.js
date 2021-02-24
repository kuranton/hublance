import style from './Input.module.css'

const Input = ({className, textarea = false, children, ...props}) => (
  textarea
  ?
    <textarea {...props} className={`${style.textarea} ${className ? className : ''}`}>{children}</textarea>
  :
    <input {...props} className={`${style.input} ${className ? className : ''}`}/>
)

export default Input
