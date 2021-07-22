import {useSelector} from 'react-redux'

import List from '@components/Popup/List'

const Certifications = ({visible, height, setHeight, search, selected, setSelected}) => {
  const certifications = useSelector(store => store.certifications.map(certification => certification.name))
  
  const add = (item) => {
    setSelected([...selected, item])
  }
  const remove = (item) => {
    setSelected(selected.filter(entry => entry !== item))
  }

  return(
    <div style={!visible ? {display: 'none'} : {}}>
      <List visible={visible} list={certifications} selected={selected} height={height} setHeight={setHeight} search={search} add={add} remove={remove}/>
    </div>
  )
}

export default Certifications
