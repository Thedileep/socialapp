
import { configureStore } from '@reduxjs/toolkit'
import { slice } from "./feature/slice";
import { userSlice } from './feature/userSlice';

export default configureStore({
reducer:{
    alerts: slice.reducer,
    user: userSlice.reducer,
},
});
