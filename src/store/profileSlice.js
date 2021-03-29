import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'counter',
  initialState: {
    name: '',
    job: '',
    email: '',
    certifications: [],
    about: '',
    country: '',
    photoUrl: ''
  },
  reducers: {
    setName: (state, action) => {state.name = action.payload},
    setJob: (state, action) => {state.job = action.payload},
    setEmail: (state, action) => {state.email = action.payload},
    setAbout: (state, action) => {state.about = action.payload},
    setRate: (state, action) => {state.rate = action.payload},
    setCountry: (state, action) => {state.country = action.payload},
    setPhotoUrl: (state, action) => {state.photoUrl = action.payload},
    addCertification: (state) => {state.certifications.push(0)}
  },
})

export const {setName, setJob, setEmail, setAbout, setRate, setCountry, setPhotoUrl, addCertification} = profileSlice.actions

export default profileSlice.reducer
