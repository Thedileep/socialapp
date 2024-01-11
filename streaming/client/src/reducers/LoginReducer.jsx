import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const LoginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    startLogin(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.user = {
        displayName: action.payload.displayName,
        email: action.payload.email,
        
      };
    
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLogin, loginSuccess, loginFailure } = LoginReducer.actions;
export default LoginReducer.reducer;
