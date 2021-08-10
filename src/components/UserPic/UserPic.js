import style from './UserPic.module.css'

const UserPic = ({url, letter, onLoad}) => (
  <div className={style.wrap}>
    {url
      ? <img className={style.photo} src={`${process.env.SERVER_URL}${url}`} alt='' onLoad={onLoad}/>
      : letter ?
        <div className={style.photoPlaceholder}>{letter}</div>
      : <div className={style.photoIcon}/>
    }
  </div>
)

export default UserPic
