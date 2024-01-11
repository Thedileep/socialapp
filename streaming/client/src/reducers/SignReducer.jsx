import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const SignReducer = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    startSignup(state) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.user =state.user = {
        displayName: action.payload.displayName,
        email: action.payload.email};
    },
    signUpFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startSignup, signUpSuccess, signUpFailure } = SignReducer.actions;
export default SignReducer.reducer;
