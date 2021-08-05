import {configureStore} from '@reduxjs/toolkit'

import freelancersSlice from './freelancersSlice'
import filtersSlice from './filtersSlice'
import profileSlice from './profileSlice'
import imageEditorSlice from './imageEditorSlice'
import certificationsSlice from './certificationsSlice'

export default configureStore({
  reducer: {
    freelancers: freelancersSlice,
    filters: filtersSlice,
    profile: profileSlice,
    imageEditor: imageEditorSlice,
    certifications: certificationsSlice
  },
})
