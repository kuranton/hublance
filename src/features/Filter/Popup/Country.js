import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setCountries} from '@store/filtersSlice'

import Search from './Search'
import List from './List'
import Footer from './Footer'

const Country = ({onCancel}) => {
  const [selected, setSelected] = useState(useSelector(state => state.filters.countries) || [])
  const [countries, setCountriesState] = useState([])
  const [filter, setFilter] = useState('')
  const filtered = countries.filter(item => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  const dispatch = useDispatch()

  const add = (item) => {
    setSelected([...selected, item])
  }
  const remove = (item) => {
    setSelected(selected.filter(entry => entry !== item))
  }

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(`https://restcountries.eu/rest/v2/all?fields=name`)
      const json = await res.json()
      setCountriesState(json.map(item => item.name))
    }

    fetchCountries()
  }, [])
  return(
    <>
      <Search onChange={setFilter}/>
      <List list={filtered} selected={selected} add={add} remove={remove}/>
      <Footer onCancel={onCancel} onSave={() => dispatch(setCountries(selected))}/>
    </>
  )
}

export default Country
