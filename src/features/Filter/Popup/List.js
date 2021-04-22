import style from './List.module.css'

const List = ({list, selected, add, remove, set, multiple = true}) => {
  const select = (item) => {
    if (!multiple) {
      set(item)
      return
    }

    if (selected.indexOf(item) !== -1) {
      remove(item)
    } else {
      add(item)
    }
  }

  return(
    <ul className={style.list}>
      {list.map((item, index) => (
        <li key={index} className={`${style.item} ${selected.indexOf(item) !== -1 ? style.selected : ''}`} onClick={() => select(item)}>
          <button className={multiple ? style.checkbox : style.radio}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default List
