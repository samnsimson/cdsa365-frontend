import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minimiseSidebar: false,
  search: "",
};

const DashboardModel = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleSidebar(state, { payload }) {
      state.minimiseSidebar = payload;
    },
    updateSearch(state, { payload }) {
      state.search = payload;
    },
  },
});

export const { toggleSidebar, updateSearch } = DashboardModel.actions;
export default DashboardModel.reducer;
