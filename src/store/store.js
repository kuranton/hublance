import {configureStore} from '@reduxjs/toolkit'

import authSlice from './authSlice'
import freelancersSlice from './freelancersSlice'
import filtersSlice from './filtersSlice'
import profileSlice from './profileSlice'
import imageEditorSlice from './imageEditorSlice'
import certificationsSlice from './certificationsSlice'
import countriesSlice from './countriesSlice'
import notificationsSlice from './notificationsSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    freelancers: freelancersSlice,
    filters: filtersSlice,
    profile: profileSlice,
    imageEditor: imageEditorSlice,
    certifications: certificationsSlice,
    countries: countriesSlice,
    notifications: notificationsSlice
  },
})
