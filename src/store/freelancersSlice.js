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
  async (arg, {dispatch}) => {
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
        email: entry.email,
        certifications: certs.filter(cert => Math.random() > 0.75)
      })
    })
    dispatch(setFreelancers(data))
  }
)

export const freelancersSlice = createSlice({
  name: 'freelancers',
  initialState: {
    list: []
  },
  reducers: {
    setFreelancers: (state, action) => {
      state.list = action.payload
    }
  }
})

export const {setFreelancers, setFiltered} = freelancersSlice.actions

export default freelancersSlice.reducer
