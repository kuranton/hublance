import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const fetchFreelancers = async (count, filters, startIndex = 0, id) => {
  const {certifications, countries, rate} = filters
  const params = new URLSearchParams({count, skip: startIndex, minRate: rate.min, maxRate: rate.max, countries, certifications})

  const res = await fetch(`${process.env.REACT_APP_API_URL}/users?${params}`)
  let data = await res.json()

  if (id) {
    data = data.filter(entry => entry._id !== id)
  }

  data = data.map((entry, index) => ({
    ...entry,
    index: startIndex + index,
    offset: (startIndex + index) * 120,
    additionalOffset: 0,
    visible: true
  }))
  return data
}

export const loadFreelancers = createAsyncThunk(
  'freelancers/loadFreelancersStatus',
  async (options, {dispatch, getState}) => {
    const count = options.count || 100
    const add = options.add || false
    const {filters, freelancers, profile} = getState()
    if (add) {
      dispatch(setLoadingAdditional(true))
    } else {
      dispatch(setLoading(true))
    }
    const startIndex = add ? freelancers.list.length : 0
    const data = await fetchFreelancers(count, filters, startIndex, profile.data._id)
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
    if (!data.length) {
      dispatch(setNoMoreResults(true))
    }
  }
)

export const freelancersSlice = createSlice({
  name: 'freelancers',
  initialState: {
    list: [],
    totalHeight: 0,
    loading: true,
    loadingAdditional: false,
    noMoreResults: false
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
    setNoMoreResults: (state, action) => {state.noMoreResults = action.payload},
    removeSameAsProfle: (state, action) => {
      let list = state.list.filter(item => item._id !== action.payload)
      state.list = list.map((entry, index) => ({
        ...entry,
        index: index,
        offset: index * 120,
        additionalOffset: 0,
        visible: true
      }))
      state.totalHeight = list.length * 120
    }
  }
})

export const {setFreelancers, addFreelancers, setTotalHeight, setLoading, setLoadingAdditional, addOffset, removeOffset, setNoMoreResults, removeSameAsProfle} = freelancersSlice.actions

export default freelancersSlice.reducer
