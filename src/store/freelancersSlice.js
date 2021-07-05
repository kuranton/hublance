import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const titles = ['SEO Specialist', 'Social Media Marketer', 'UI Designer', 'Developer', 'Designer']
const certs = [
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

export const fetchFreelancers = createAsyncThunk(
  'freelancers/fetchFreelancersStatus',
  async (arg, {dispatch, getState}) => {
    dispatch(setLoading(true))
    const res = await fetch(`https://randomuser.me/api/?results=100`, {dataType: 'json', results: 100})
    const json = await res.json()
    let data = []
    json.results.forEach((entry, index) => {
      data.push({
        index,
        photoUrl: entry.picture.medium,
        title: titles[Math.floor(Math.random() * titles.length)],
        name: `${entry.name.first} ${entry.name.last}`,
        rate: Math.floor(Math.random() * 22)*5 + 5,
        country: entry.location.country,
        email: entry.email,
        certifications: certs.filter(cert => Math.random() > 0.75),
        offset: index * 120,
        additionalOffset: 0,
        visible: true
      })
    })
    dispatch(setFreelancers(data))

    const {filters} = getState()
    const {certifications, countries, rate} = filters

    if (!rate.max && !rate.min && !certifications.length && !countries.length) {
      dispatch(setLoading(false))
      dispatch(setTotalHeight(data.length * 120))
      return
    }

    dispatch(filterFreelancers())
  }
)

export const freelancersSlice = createSlice({
  name: 'freelancers',
  initialState: {
    list: [],
    totalHeight: 0,
    loading: false
  },
  reducers: {
    setFreelancers: (state, action) => {
      state.list = action.payload
    },
    setFiltered: (state, action) => {
      state.filtered = action.payload
    },
    setTotalHeight: (state, action) => {
      state.totalHeight = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    addOffset: (state, action) => {
      const {index, amount} = action.payload
      state.list[index].additionalOffset = amount
      state.totalHeight += amount
      for (var i = index + 1; i < state.list.length; i++) {
        state.list[i].offset += amount
      }
    },
    removeOffset: (state, action) => {
      const {index, amount} = action.payload
      state.list[index].additionalOffset = 0
      state.totalHeight -= amount
      for (var i = index + 1; i < state.list.length; i++) {
        state.list[i].offset -= amount
      }
    }
  }
})

export const filterFreelancers = () => (dispatch, getState) => {
  const {freelancers, filters} = getState()
  const {certifications, countries, rate} = filters
  const {list} = freelancers

  dispatch(setLoading(true))
  let offset = 0
  const arr = list.map(item => {
    let freelancer = {...item}
    if (
      freelancer.rate > rate.min &&
      (!rate.max || freelancer.rate < rate.max) &&
      (!certifications.length || certifications.every(certification => freelancer.certifications.includes(certification))) &&
      (!countries.length || countries.includes(freelancer.country))
    ) {
      freelancer.visible = true
      freelancer.offset = offset
      offset += freelancer.additionalOffset
      offset += 120
    } else {
      freelancer.visible = false
    }
    return freelancer
  })

  setTimeout(() => {
    dispatch(setLoading(false))
    dispatch(setFreelancers(arr))
    dispatch(setTotalHeight(offset))
  }, 1000)
}

export const {setFreelancers, setTotalHeight, setLoading, addOffset, removeOffset} = freelancersSlice.actions

export default freelancersSlice.reducer
