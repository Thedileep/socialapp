import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../reducers/SignReducer'; // Import your reducer
import loginReducer from '../reducers/LoginReducer';

 const Store = configureStore({
  reducer: {
    signUp: signUpReducer,
    login: loginReducer,
  },
});

export default Store;