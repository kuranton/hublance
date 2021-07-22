import {createSlice} from '@reduxjs/toolkit'

import {getTextWidth} from '@util/getTextWidth'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    certifications: [],
    countries: [],
    rate: {
      min: 0,
      max: 0
    },
    widths: {
      countries: [],
      certifications: [],
      rate: []
    }
  },
  reducers: {
    setCertifications: (state, action) => {
      state.certifications = action.payload
      const widths = action.payload.map((certification, index) => {
        return getTextWidth(certification, '500 14px ProximaSoft') + 39 // 4 margin + 15px close button + 20px padding and border
      })
      state.widths.certifications = widths
    },
    unsetWidth: (state, action) => {
      state.widths[action.payload.type][action.payload.index] = 0
    },
    removeCertification: (state, action) => {
      let i = -1
      state.certifications = state.certifications.filter((item, index) => {
        if (item === action.payload) {
          i = index
          return false
        }
        return true
      })
      state.widths.certifications = state.widths.certifications.filter((entry, index) => index !== i)
    },
    setCountries: (state, action) => {
      state.countries = action.payload
      const widths = action.payload.map((country, index) => {
        return getTextWidth(country, '500 14px ProximaSoft') + 39
      })
      state.widths.countries = widths
    },
    removeCountry: (state, action) => {
      let i = -1
      state.countries = state.countries.filter((item, index) => {
        if (item === action.payload) {
          i = index
          return false
        }
        return true
      })
      state.widths.countries = state.widths.countries.filter((entry, index) => index !== i)
    },
    setRate: (state, action) => {
      const {min, max} = action.payload
      const text = min ? max ? `$${min} - $${max}` : `Above $${min}` : `Below $${max}`
      const width = getTextWidth(text, '500 14px ProximaSoft') + 39
      state.rate = {min, max, text}
      state.widths.rate = [width]
    }
  },
})

export const {setCertifications, unsetWidth, removeCertification, removeCountry, setCountries, setRate} = filtersSlice.actions

export default filtersSlice.reducer
