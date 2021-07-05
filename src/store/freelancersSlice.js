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

const fetchFreelancers = async (count, filters, startIndex = 0) => {
  const {certifications, countries, rate} = filters
  const min = rate.min || 5
  const max = rate.max || 115
  const crt = certifications.length ? certifications : certs

  const res = await fetch(`https://randomuser.me/api/?results=${count}`, {dataType: 'json', results: count})
  const json = await res.json()

  let data = []
  json.results.forEach((entry, index) => {
    data.push({
      index: startIndex + index,
      photoUrl: entry.picture.medium,
      title: titles[Math.floor(Math.random() * titles.length)],
      name: `${entry.name.first} ${entry.name.last}`,
      // rate: Math.floor(Math.random() * 22)*5 + 5,
      // country: entry.location.country,

      rate: Math.floor(Math.random() * (max - min)) + min,
      country: countries.length ? countries[Math.floor(Math.random() * countries.length)] : entry.location.country,

      email: entry.email,
      certifications: crt.filter(cert => Math.random() > 0.75),
      offset: (startIndex + index) * 120,
      additionalOffset: 0,
      visible: true
    })
  })
  return data
}

export const loadFreelancers = createAsyncThunk(
  'freelancers/loadFreelancersStatus',
  async (options, {dispatch, getState}) => {
    const count = options.count || 100
    const add = options.add || false
    if (add) {
      dispatch(setLoadingAdditional(true))
    } else {
      dispatch(setLoading(true))
    }
    const {filters, freelancers} = getState()
    const startIndex = add ? freelancers.list.length : 0
    const data = await fetchFreelancers(count, filters, startIndex)
    if (add) {
      dispatch(addFreelancers(data))
    } else {
      dispatch(setFreelancers(data))
    }
    if (add) {
      dispatch(setLoadingAdditional(false))
    } else {
      dispatch(setLoading(false))
    }
  }
)

export const freelancersSlice = createSlice({
  name: 'freelancers',
  initialState: {
    list: [],
    totalHeight: 0,
    loading: true,
    loadingAdditional: false
  },
  reducers: {
    setFreelancers: (state, action) => {
      state.list = action.payload
      state.totalHeight = action.payload.length * 120
    },
    addFreelancers: (state, action) => {
      state.list = [...state.list, ...action.payload]
      state.totalHeight += action.payload.length * 120
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
    setLoadingAdditional: (state, action) => {
      state.loadingAdditional = action.payload
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

export const {setFreelancers, addFreelancers, setTotalHeight, setLoading, setLoadingAdditional, addOffset, removeOffset} = freelancersSlice.actions

export default freelancersSlice.reducer
