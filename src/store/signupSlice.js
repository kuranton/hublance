import {createSlice} from '@reduxjs/toolkit'

export const signupSlice = createSlice({
  name: 'counter',
  initialState: {
    visible: true,
    started: false,
    submitted: false,
  },
  reducers: {
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

export const {submit, hide, show, start} = signupSlice.actions

export default signupSlice.reducer
