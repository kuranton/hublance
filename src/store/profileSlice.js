import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const logIn = createAsyncThunk(
  'profile/loginStatus',
  async (options, {dispatch, getState}) => {
    const {email, password} = getState().profile.data
    try {
      const res = await fetch('https://localhost:3600/auth', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      if (!res.ok) {
        return
      }
      const {data, accessToken, accessExpiry} = await res.json()
      dispatch(setAccessToken(accessToken))
      dispatch(setExpiry(accessExpiry))
      dispatch(setSignedUp())
      dispatch(setData(data))
    } catch(e) {
      console.log(e)
    }
  }
)

export const signUp = createAsyncThunk(
  'profile/saveStatus',
  async (options, {dispatch, getState}) => {
    const {data} = getState().profile
    try {
      const res = await fetch('https://localhost:3600/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        return
      }
      const json = await res.json()
      dispatch(setId(json.data._id))
      dispatch(setAccessToken(json.accessToken))
      dispatch(setExpiry(json.accessExpiry))
      dispatch(setPassword(''))
      dispatch(setSignedUp())
    } catch(e) {
      console.log(e)
    }
  }
)

const refreshToken = createAsyncThunk(
  'profile/updateStatus',
  async (options, {dispatch}) => {
    try {
      const res = await fetch('https://localhost:3600/auth/refresh', {
        method: 'POST',
        mode: 'cors'
      })
      const {accessToken, accessExpiry} = res
      dispatch(setAccessToken(accessToken))
      dispatch(setExpiry(accessExpiry))
    } catch (e) {
      console.log(e)
    }
  }
)

export const update = createAsyncThunk(
  'profile/updateStatus',
  async (options, {dispatch, getState}) => {
    const {data, accessToken} = getState().profile
    if (new Date(accessToken.expiry) < Date.now()) {
      await dispatch(refreshToken())
    }
    try {
      await fetch(`https://localhost:3600/users/${data._id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.token}`
        },
        body: JSON.stringify(data)
      })
    } catch (e) {
      console.log(e)
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: {
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
      signupStarted: false,
      signedUp: false
    },
    accessToken: {
      token: '',
      expiry: null
    }
  },
  reducers: {
    setData: (state, action) => {state.data = action.payload},
    setId: (state, action) => {state.data._id = action.payload},
    setName: (state, action) => {state.data.name = action.payload},
    setTitle: (state, action) => {state.data.title = action.payload},
    setEmail: (state, action) => {state.data.email = action.payload},
    setPassword: (state, action) => {state.data.password = action.payload},
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
    hide: (state) => {state.status.visible = false},
    setSignedUp: (state) => {state.status.signedUp = true},
    setAccessToken: (state, action) => {state.accessToken.token = action.payload},
    setExpiry: (state, action) => {state.accessToken.expiry = action.payload}
  },
})

export const {
  setData, setId, setName, setTitle, setEmail, setPassword, setAbout, setRate, setCountry, setPhotoUrl, addCertification,
  removeCertififcation, edit, stopEditing, startSignup, show, hide, setSignedUp, setAccessToken, setExpiry
} = profileSlice.actions

export default profileSlice.reducer
