import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'counter',
  initialState: {
    name: '',
    job: '',
    email: '',
    rate: 0,
    certifications: [],
    about: '',
    country: '',
    photoUrl: '',
    editing: false
  },
  reducers: {
    setName: (state, action) => {state.name = action.payload.trim()},
    setJob: (state, action) => {state.job = action.payload.trim()},
    setEmail: (state, action) => {state.email = action.payload.trim()},
    setAbout: (state, action) => {state.about = action.payload.trim()},
    setRate: (state, action) => {state.rate = action.payload},
    setCountry: (state, action) => {state.country = action.payload},
    setPhotoUrl: (state, action) => {state.photoUrl = action.payload},
    addCertification: (state) => {state.certifications.push(0)},
    edit: (state) => {state.editing = true},
    stopEditing: (state) => {state.editing = false}
  },
})

export const {setName, setJob, setEmail, setAbout, setRate, setCountry, setPhotoUrl, addCertification, edit, stopEditing} = profileSlice.actions

export default profileSlice.reducer
