import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {refreshToken} from '@store/authSlice'
import {addNotification} from '@store/notificationsSlice'

export const update = createAsyncThunk(
  'profile/updateStatus',
  async (options, {dispatch, getState}) => {
    const state = getState()
    let {token, expiry} = state.auth.accessToken
    const {data} = state.profile
    if (new Date(expiry) < Date.now()) {
      await dispatch(refreshToken())
      const accessToken = getState().auth
      token = accessToken.token
    }
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/users/${data._id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      dispatch(addNotification({text: 'Profile saved'}))
    } catch (e) {
      console.log(e)
    }
  }
)

export const tryGetData = createAsyncThunk(
  'profile/updateStatus',
  async (options, {dispatch, getState}) => {
    let {token, expiry} = getState().auth.accessToken
    if (!token || new Date(expiry) < Date.now()) {
      await dispatch(refreshToken())
      const {accessToken} = getState().auth
      token = accessToken.token
    }
    const {_id} = getState().profile.data
    if (!token) {
      return
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) {
        return
      }
      const data = await res.json()
      dispatch(setData(data))
    } catch (e) {
      console.log(e)
    }
  }
)

const initialState = {
  data: {
    _id: '',
    name: '',
    title: '',
    email: '',
    password: '',
    rate: '',
    certifications: [],
    about: '',
    country: '',
    photoUrl: ''
  },
  status: {
    editing: false,
    visible: true,
    signupStarted: false
  }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setData: (state, action) => {state.data = action.payload},
    clear: (state) => initialState,
    setId: (state, action) => {state.data._id = action.payload},
    setName: (state, action) => {state.data.name = action.payload},
    setTitle: (state, action) => {state.data.title = action.payload},
    setEmail: (state, action) => {state.data.email = action.payload},
    setAbout: (state, action) => {state.data.about = action.payload},
    setRate: (state, action) => {state.data.rate = action.payload},
    setCountry: (state, action) => {state.data.country = action.payload},
    setPhotoUrl: (state, action) => {state.data.photoUrl = action.payload},
    addCertification: (state, action) => {state.data.certifications.push(action.payload)},
    removeCertification: (state, action) => {
      state.data.certifications = state.data.certifications.filter(certification => certification.name !== action.payload)
    },
    edit: (state) => {state.status.editing = true},
    stopEditing: (state) => {state.status.editing = false},
    startSignup: (state) => {state.status.signupStarted = true},
    show: (state) => {state.status.visible = true},
    hide: (state) => {state.status.visible = false}
  },
})

export const {
  setData, clear, setId, setName, setTitle, setEmail, setAbout, setRate, setCountry, setPhotoUrl, addCertification,
  removeCertififcation, edit, stopEditing, startSignup, show, hide
} = profileSlice.actions

export default profileSlice.reducer
