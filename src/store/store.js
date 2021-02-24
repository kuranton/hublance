import { configureStore } from '@reduxjs/toolkit';
import freelancersSlice from '../features/Freelancers/freelancersSlice';
import signupSlice from '../features/Signup/signupSlice';

export default configureStore({
  reducer: {
    freelancers: freelancersSlice,
    signup: signupSlice
  },
});
