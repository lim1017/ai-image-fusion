import type { Reducer, Action } from "@reduxjs/toolkit";

export enum userActions {
  ADDFAV = "ADDFAV",
  REMOVEFAV = "REMOVEFAV",
}

interface UserState {
  favourites: string[]; // Adjust the type based on what your IDs are
}

export const initialUserState = {
  favourites: [],
};

interface Actions<T> extends Action {
  payload: T;
}

export const userReducer: Reducer<UserState, Actions<string>> = (
  state = initialUserState,
  action
) => {
  console.log({ state, action });
  switch (action.type) {
    case userActions.ADDFAV:
      return { favourites: [...state.favourites, action.payload] };
    case userActions.REMOVEFAV:
      return {
        favourites: state.favourites.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};
