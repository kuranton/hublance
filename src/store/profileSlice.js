import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
    job: '',
    email: '',
    rate: '',
    certifications: [],
    about: '',
    country: '',
    photoUrl: '',
    editing: false
  },
  reducers: {
    setName: (state, action) => {state.name = action.payload},
    setJob: (state, action) => {state.job = action.payload},
    setEmail: (state, action) => {state.email = action.payload},
    setAbout: (state, action) => {state.about = action.payload},
    setRate: (state, action) => {state.rate = action.payload},
    setCountry: (state, action) => {state.country = action.payload},
    setPhotoUrl: (state, action) => {state.photoUrl = action.payload},
    addCertification: (state, action) => {state.certifications.push(action.payload)},
    removeCertification: (state, action) => {
      state.certifications = state.certifications.filter(certification => certification.name !== action.payload)
    },
    edit: (state) => {state.editing = true},
    stopEditing: (state) => {state.editing = false}
  },
})

export const {setName, setJob, setEmail, setAbout, setRate, setCountry, setPhotoUrl, addCertification, removeCertififcation, edit, stopEditing} = profileSlice.actions

export default profileSlice.reducer
