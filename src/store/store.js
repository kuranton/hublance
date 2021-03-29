import {configureStore} from '@reduxjs/toolkit'
import freelancersSlice from '../features/Freelancers/freelancersSlice'

import signupSlice from './signupSlice'
import profileSlice from './profileSlice'
import imageEditorSlice from './imageEditorSlice'

export default configureStore({
  reducer: {
    freelancers: freelancersSlice,
    signup: signupSlice,
    profile: profileSlice,
    imageEditor: imageEditorSlice
  },
})
