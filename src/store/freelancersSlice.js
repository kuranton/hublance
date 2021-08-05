import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

// const titles = ['SEO Specialist', 'Social Media Marketer', 'UI Designer', 'Developer', 'Designer']

const fetchFreelancers = async (count, filters, certifications, startIndex = 0) => {
  // const {certifications: certs, countries, rate} = filters

  const params = new URLSearchParams({count, skip: startIndex})
  const res = await fetch(`https://localhost:3600/users?${params}`)
  let {data, count: totalCount} = await res.json()

  data = data.map((entry, index) => ({
    ...entry,
    index: startIndex + index,
    offset: (startIndex + index) * 120,
    additionalOffset: 0,
    visible: true
  }))
  return {data, totalCount}
}

export const loadFreelancers = createAsyncThunk(
  'freelancers/loadFreelancersStatus',
  async (options, {dispatch, getState}) => {
    const count = options.count || 100
    const add = options.add || false
    const {filters, freelancers, certifications} = getState()
    if (add && freelancers.list.length >= freelancers.totalCount) {
      return
    }
    if (add) {
      dispatch(setLoadingAdditional(true))
    } else {
      dispatch(setLoading(true))
    }
    const startIndex = add ? freelancers.list.length : 0
    const {data, totalCount} = await fetchFreelancers(count, filters, certifications, startIndex)
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
    dispatch(setTotalCount(totalCount))
  }
)

export const freelancersSlice = createSlice({
  name: 'freelancers',
  initialState: {
    list: [],
    totalHeight: 0,
    loading: true,
    loadingAdditional: false,
    totalCount: 0
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
    },
    setTotalCount: (state, action) => {state.totalCount = action.payload}
  }
})

export const {setFreelancers, addFreelancers, setTotalHeight, setLoading, setLoadingAdditional, addOffset, removeOffset, setTotalCount} = freelancersSlice.actions

export default freelancersSlice.reducer
