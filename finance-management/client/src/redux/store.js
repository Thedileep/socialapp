
import { configureStore } from '@reduxjs/toolkit'
import { slice } from "./slice";
import { userSlice } from './userSlice';

export default configureStore({
reducer:{
    alerts: slice.reducer,
    user: userSlice.reducer,
},
});
