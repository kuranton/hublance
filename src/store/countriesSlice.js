import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: [],
  reducers: {
    setList: (state, action) => action.payload,
  }
})

export const loadCountries = createAsyncThunk(
  'countries/loadStatus',
  async (options, {dispatch, getState}) => {
    try {
      const res = await fetch(`https://restcountries.eu/rest/v2/all?fields=name;languages;alpha3Code;altSpellings;region;subregion;population`)
      const json = await res.json()
      let list = json.reduce((result, el) => {
        if (el.alpha3Code === 'USA') {
          el.name = 'United States'
        }
        if (el.name === 'United Kingdom of Great Britain and Northern Ireland') {
          el.name = 'United Kingdom'
        }
        if (el.alpha3Code === 'VGB') {
          el.name = 'British Virgin Islands'
        }
        if (el.alpha3Code === 'VIR') {
          el.name = 'US Virgin Islands'
        }
        if (el.name.indexOf(' (') !== -1) {
          el.altSpellings.push(el.name)
          el.name = el.name.substring(0, el.name.indexOf(' ('))
        }
        if (el.alpha3Code !== 'PRK' && el.alpha3Code !== 'COD') {
          result.push(el)
        }
        return result
      }, [])
      list = list.sort((a, b) => {
        if (a.alpha3Code === 'USA') {
          return -1
        }
        if (b.alpha3Code === 'USA') {
          return 1
        }
        if ((a.region === 'Europe' || a.subregion === 'Northern America') && b.region !== 'Europe' && b.subregion !== 'Northern America') {
          return -1
        }
        if ((b.region === 'Europe' || b.subregion === 'Northern America') && a.region !== 'Europe' && a.subregion !== 'Northern America') {
          return 1
        }
        if (a.population > 1000000 && b.population < 1000000) {
          return -1
        }
        if (b.population > 1000000 && a.population < 1000000) {
          return 1
        }
        if (a.languages && a.languages.length) {
          if (a.languages[0].name === 'English' && b.languages[0].name === 'English') {
            return b.name - a.name
          }
          if (a.languages[0].name === 'English') {
            return -1
          }
          if (b.languages[0].name === 'English') {
            return 1
          }
          if (a.languages.find(entry => entry.name === 'English') && b.languages.find(entry => entry.name === 'English')) {
            return b.name - a.name
          }
          if (a.languages.find(entry => entry.name === 'English')) {
            return -1
          }
          if (b.languages.find(entry => entry.name === 'English')) {
            return 1
          }
        }
        return b.name - a.name
      })
      dispatch(setList(list))
    } catch(e) {
      console.log(e)
    }
  }
)

export const {setList} = countriesSlice.actions

export default countriesSlice.reducer
