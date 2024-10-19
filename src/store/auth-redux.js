import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token") || '',
  isLoggedIn: !!localStorage.getItem("token"),  // Convert token existence into boolean
  email: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      // Save token to localStorage
      localStorage.setItem("token", token);
      
      // Update state with token and email
      state.token = token;
      state.email = email;
      state.isLoggedIn = !!token;
    },
    logout(state) {
      // Remove token from localStorage
      localStorage.removeItem("token");
      
      // Reset the state
      state.token = '';
      state.email = '';
      state.isLoggedIn = false;
    }
  }
});

// Export the actions
export const authActions= authSlice.actions;

// Export the reducer to configure the store
export default authSlice;
