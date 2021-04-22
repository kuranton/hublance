import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setCertifications} from '@store/filtersSlice'

import Search from './Search'
import List from './List'
import Footer from './Footer'

const certifications = [
  'Hubspot CMS for Developers',
  'Contextual Marketing',
  'Growth-Driven Design Agency',
  'HubSpot Sales Software',
  'Content Marketing',
  'Growth-Driven Design',
  'Sales Enablement',
  'Lorem Ipsum',
  'Dolor sit amet',
  'Consectetur adipiscing elit'
]

const Certifications = ({onCancel}) => {
  const [selected, setSelected] = useState(useSelector(store => store.filters.certifications) || [])
  const [filter, setFilter] = useState('')
  const filtered = certifications.filter(item => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  const dispatch = useDispatch()

  const add = (item) => {
    setSelected([...selected, item])
  }
  const remove = (item) => {
    setSelected(selected.filter(entry => entry !== item))
  }

  return(
    <>
      <Search onChange={setFilter}/>
      <List list={filtered} selected={selected} add={add} remove={remove}/>
      <Footer onCancel={onCancel} onSave={() => dispatch(setCertifications(selected))}/>
    </>
  )
}

export default Certifications
