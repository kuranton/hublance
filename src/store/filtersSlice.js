import {createSlice} from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    certifications: [],
    countries: [],
    rate: {
      min: 0,
      max: 0
    }
  },
  reducers: {
    addCertification: (state, action) => {state.certifications.push(action.payload)},
    setCertifications: (state, action) => {state.certifications = action.payload},
    removeCertification: (state, action) => {state.certifications = state.certifications.filter(item => item !== action.payload)},
    addCountry: (state, action) => {state.countries.push(action.payload)},
    setCountries: (state, action) => {state.countries = action.payload},
    removeCountry: (state, action) => {state.countries = state.countries.filter(item => item !== action.payload)},
    setRate: (state, action) => {state.rate = action.payload},
    setMinRate: (state, action) => {state.rate.min = action.payload},
    setMaxRate: (state, action) => {state.rate.max = action.payload}
  },
})

export const {addCertification, setCertifications, removeCertification, addCountry, removeCountry, setCountries, setRate, setMinRate, setMaxRate} = filtersSlice.actions

export default filtersSlice.reducer
