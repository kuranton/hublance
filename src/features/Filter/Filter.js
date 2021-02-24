import style from './Filter.module.css'

const Filter = () => {
  return(
    <div className={style.wrap}>
      <span>Filters:</span>
      <button className={style.addButton} aria-label='add filter'>Add filter</button>
    </div>
  )
}

export default Filter
