import type { Reducer } from "@reduxjs/toolkit";

enum userActions {
  ADDFAV = "ADDFAV",
}

// Define the initial state
const initialState = {
  user: {
    favourites: [], // or whatever your initial state should be
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.ADDFAV:
      return [...state.user.favourites, action.payload];
    default:
      return state;
  }
};
