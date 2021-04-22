import {configureStore} from '@reduxjs/toolkit'

import freelancersSlice from './freelancersSlice'
import filtersSlice from './filtersSlice'
import signupSlice from './signupSlice'
import profileSlice from './profileSlice'
import imageEditorSlice from './imageEditorSlice'

export default configureStore({
  reducer: {
    freelancers: freelancersSlice,
    filters: filtersSlice,
    signup: signupSlice,
    profile: profileSlice,
    imageEditor: imageEditorSlice
  },
})
