import { configureStore } from '@reduxjs/toolkit';
import freelancersSlice from '../features/Freelancers/freelancersSlice';
import signupSlice from '../features/Signup/signupSlice';

import imageEditorSlice from './imageEditorSlice'

export default configureStore({
  reducer: {
    freelancers: freelancersSlice,
    signup: signupSlice,
    imageEditor: imageEditorSlice
  },
});
