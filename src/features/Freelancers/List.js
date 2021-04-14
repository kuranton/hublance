import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import style from './List.module.css'

import Single from './Single'

import Join from '@features/Signup/Join'
import Form from '@features/Signup/Form'
import Profile from '@features/Profile'

const titles = ['SEO Specialist', 'Social Media Marketer', 'UI Designer', 'Developer', 'Designer']

const List = () => {
  const [freelancers, setFreelancers] = useState([])
  const started = useSelector(store => store.signup.started)
  const visible = useSelector(store => store.signup.visible)
  const editing = useSelector(store => store.profile.editing)

  useEffect(() => {
    async function fetchFreelancers() {
      const res = await fetch(`https://randomuser.me/api/?results=100`, {dataType: 'json', results: 100})
      const json = await res.json()
      let data = []
      json.results.forEach((entry, index) => {
        data.push({
          id: index,
          photoUrl: entry.picture.medium,
          title: titles[Math.floor(Math.random() * titles.length)],
          name: `${entry.name.first} ${entry.name.last}`,
          rate: Math.floor(Math.random() * 22)*5 + 5,
          country: entry.location.country,
          email: entry.email
        })
      })
      setFreelancers(data)
    }

    fetchFreelancers()
  }, [])

  return(
    <div className={style.wrap}>
      <div className={style.header}>
        <span>Photo</span>
        <span>Title</span>
        <span>Name</span>
        <span>Hourly rate</span>
        <span>Country</span>
      </div>

      <div className={style.body}>
        <ul className={style.list}>
          {visible ?
            editing ?
              <Profile/>
            :
            started ?
              <Form/>
            :
            <li className={style.row}>
              <Join/>
            </li>
          : null
          }

          {freelancers.map(freelancer => <li key={freelancer.id} className={style.row}><Single data={freelancer}/></li>)}
        </ul>
      </div>
    </div>
  )
}

export default List
