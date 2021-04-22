import style from './Search.module.css'

const Search = ({onChange}) => {
  return(
    <div className={style.wrap}>
      <input type='text' className={style.input} placeholder='Search' onChange={e => onChange(e.target.value)}/>
    </div>
  )
}

export default Search
