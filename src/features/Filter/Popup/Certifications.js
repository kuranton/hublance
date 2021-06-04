import List from '@components/Popup/List'

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

const Certifications = ({visible, height, setHeight, search, selected, setSelected}) => {
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
