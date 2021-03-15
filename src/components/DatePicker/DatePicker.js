import DatePickerDefault from 'react-datepicker'
import style from '../Input/Input.module.css'

const DatePicker = ({className, ...props}) => (
  <DatePickerDefault wrapperClassName={style.wrapper} className={`${style.input} ${className ? className : ''}`} {...props}/>
)

export default DatePicker
