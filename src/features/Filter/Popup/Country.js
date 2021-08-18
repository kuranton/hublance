import {useSelector} from 'react-redux'

import List from '@components/Popup/List'

const Country = ({visible, height, setHeight, search, selected, setSelected}) => {
  const countries = useSelector(store => store.countries)

  const add = (item) => {
    setSelected([...selected, item])
  }
  const remove = (item) => {
    setSelected(selected.filter(entry => entry !== item))
  }
  return(
    <div style={!visible ? {display: 'none'} : {}}>
      <List visible={visible} list={countries} selected={selected} height={height} setHeight={setHeight} search={search} add={add} remove={remove} searchFields={['name', 'alpha3Code', 'altSpellings']}/>
    </div>
  )
}

export default Country
