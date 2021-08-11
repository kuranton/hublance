import jwtDecode from 'jwt-decode'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {setData, setId, clear as clearProfile} from '@store/profileSlice'

const initialState = {
  credentials: {
    email: '',
    password: ''
  },
  authenticated: false,
  accessToken: {
    token: '',
    expiry: null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear: (state) => initialState,
    setEmail: (state, action) => {state.credentials.email = action.payload},
    setPassword: (state, action) => {state.credentials.password = action.payload},
    setAccessToken: (state, action) => {state.accessToken = action.payload},
    setAuthenticated: (state, action) => {state.authenticated = action.payload}
  },
})

export const logIn = createAsyncThunk(
  'profile/loginStatus',
  async (options, {dispatch, getState}) => {
    const {email, password} = getState().auth.credentials
    try {
      const res = await fetch('https://localhost:3600/auth', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      if (!res.ok) {
        return
      }
      const {data, accessToken, accessExpiry} = await res.json()
      dispatch(setAccessToken({token: accessToken, expiry: accessExpiry}))
      dispatch(setAuthenticated(true))
      dispatch(setData(data))
      dispatch(setPassword(''))
    } catch(e) {
      console.log(e)
    }
  }
)

export const logOut = createAsyncThunk(
  'auth/logoutStatus',
  async (options, {dispatch, getState}) => {
    let {token, expiry} = getState().auth.accessToken
    if (!token || new Date(expiry) < Date.now()) {
      await dispatch(refreshToken())
      const {accessToken} = getState().auth
      token = accessToken.token
    }
    if (!token) {
      return
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) {
        return
      }
      dispatch(clearProfile())
      dispatch(clear())
    } catch (e) {
      console.log(e)
    }
  }
)

export const signUp = createAsyncThunk(
  'profile/saveStatus',
  async (options, {dispatch, getState}) => {
    const state = getState()
    const {name} = state.profile.data
    const {email, password} = state.auth.credentials
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      })
      if (!res.ok) {
        return
      }
      const {data, accessToken, accessExpiry} = await res.json()
      dispatch(setAccessToken({token: accessToken, expiry: accessExpiry}))
      dispatch(setAuthenticated(true))
      dispatch(setData(data))
      dispatch(setPassword(''))
    } catch(e) {
      console.log(e)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'profile/updateStatus',
  async (options, {dispatch}) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
      })
      if (!res.ok) {
        dispatch(setAuthenticated(false))
        return
      }
      const {accessToken, accessExpiry} = await res.json()
      const {_id} = jwtDecode(accessToken)
      dispatch(setId(_id))
      dispatch(setAccessToken({token: accessToken, expiry: accessExpiry}))
      dispatch(setAuthenticated(true))
    } catch (e) {
      dispatch(setAuthenticated(false))
      console.log(e)
    }
  }
)

export const {
  clear, setEmail, setPassword, setAccessToken, setAuthenticated
} = authSlice.actions

export default authSlice.reducer
