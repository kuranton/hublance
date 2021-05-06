import {useState, useEffect} from 'react'

import List from './List'

const Country = ({visible, height, setHeight, search, selected, setSelected}) => {
  const [countries, setCountriesState] = useState([])

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
    <div style={!visible ? {display: 'none'} : {}}>
      <List visible={visible} list={countries} selected={selected} height={height} setHeight={setHeight} search={search} add={add} remove={remove}/>
    </div>
  )
}

export default Country
