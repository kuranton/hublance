import {createSlice} from '@reduxjs/toolkit'
import uniqid from 'uniqid'

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: uniqid(),
        type: action.payload.type || 'default',
        text: action.payload.text
      }
      state.push(notification)
    },
    removeNotification: (state, action) => {
      return state.filter(notification => notification.id !== action.payload)
    }
  }
})

export const {
  addNotification, removeNotification
} = notificationsSlice.actions

export default notificationsSlice.reducer
