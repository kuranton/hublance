import { createSlice } from '@reduxjs/toolkit'

export const signupSlice = createSlice({
  name: 'counter',
  initialState: {
    visible: true,
    started: false,
    name: '',
    job: '',
    email: '',
    certifications: [],
    about: '',
    submitted: false,
    country: ''
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setJob: (state, action) => {
      state.job = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setAbout: (state, action) => {
      state.about = action.payload
    },
    setRate: (state, action) => {
      state.rate = action.payload
    },
    setCountry: (state, action) => {
      state.country = action.payload
    },
    addCertification: (state) => {
      state.certifications.push(0)
    },
    submit: (state) => {
      state.submitted = true
    },
    hide: (state) => {
      state.visible = false
    },
    show: (state) => {
      state.visible = true
    },
    start: (state) => {
      state.started = true
    }
  },
})

export const { setName, setJob, setEmail, setAbout, setRate, setCountry, addCertification, submit, hide, show, start } = signupSlice.actions

export default signupSlice.reducer
