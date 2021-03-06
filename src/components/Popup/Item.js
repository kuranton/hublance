import style from './Item.module.css'

const Item = ({selected, onSelect, multiple, data}) => {
  return(
    <li
      className={`${style.item} ${selected ? style.selected : ''}`}
      onClick={onSelect}
      style={{animationName: data.visible ? style.appear : style.disappear, transform: `translateY(${data.offset}px)`}}
    >
      <button type='button' className={multiple ? style.checkbox : style.radio}>Select</button>
      {data.name}
    </li>
  )
}

export default Item
