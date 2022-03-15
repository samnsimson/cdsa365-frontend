import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: "",
};

const UserModel = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLogin(state, { payload }) {
      state.isLoggedIn = payload;
    },
    updateUser(state, { payload }) {
      state.id = payload;
    },
  },
});

export const { toggleLogin, updateUser } = UserModel.actions;
export default UserModel.reducer;
