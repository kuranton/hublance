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
  },
  errors: {
    login: '',
    signup: '',
    recovery: '',
    reset: '',
    change: ''
  },
  success: {
    recovery: false,
    reset: false,
    change: false
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
    setAuthenticated: (state, action) => {state.authenticated = action.payload},
    setError: (state, action) => {
      state.errors = {...state.errors, ...action.payload}
    },
    setSuccess: (state, action) => {
      state.success = {...state.success, ...action.payload}
    }
  },
})

export const logIn = createAsyncThunk(
  'profile/loginStatus',
  async (options, {dispatch, getState}) => {
    dispatch(setError({login: ''}))
    const {email, password} = getState().auth.credentials
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      if (!res.ok) {
        const {message} = await res.json()
        dispatch(setError({login: message}))
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
    dispatch(setError({signup: ''}))
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
        const {message} = await res.json()
        dispatch(setError({signup: message}))
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
      dispatch(clearProfile())
      dispatch(clear())
      console.log(e)
    }
  }
)

export const requestPasswordRecovery = createAsyncThunk(
  'profile/passwordRecoveryStatus',
  async (options, {dispatch, getState}) => {
    dispatch(setError({recovery: ''}))
    try {
      const {email} = getState().auth.credentials
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/recovery`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
      if (!res.ok) {
        const {message} = await res.json()
        dispatch(setError({recovery: message}))
        return
      }
      dispatch(setSuccess({recovery: true}))
    } catch(e) {
      console.log(e)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'profile/resetStatus',
  async ({id, token}, {dispatch, getState}) => {
    dispatch(setError({reset: ''}))
    try {
      const {password} = getState().auth.credentials
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, token, password})
      })
      if (!res.ok) {
        const {message} = await res.json()
        dispatch(setError({reset: message}))
        return
      }
      dispatch(setPassword(''))
      dispatch(setSuccess({reset: true}))
    } catch(e) {
      console.log(e)
    }
  }
)

export const changePassword = createAsyncThunk(
  'profile/changePasswordStatus',
  async({oldPassword, newPassword}, {dispatch, getState}) => {
    dispatch(setError({change: ''}))
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
      const state = getState()
      const {_id} = state.profile.data
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}/password`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({oldPassword, newPassword})
      })
      if (!res.ok) {
        const {message} = await res.json()
        dispatch(setError({change: message}))
        return
      }
      dispatch(setSuccess({change: true}))
    } catch(e) {
      console.log(e)
    }
  }
)

export const {
  clear, setEmail, setPassword, setAccessToken, setAuthenticated, setError, setSuccess
} = authSlice.actions

export default authSlice.reducer
