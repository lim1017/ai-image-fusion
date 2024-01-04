import type { Reducer, Action } from "@reduxjs/toolkit";

export enum userActions {
  ADDFAV = "ADDFAV",
  REMOVEFAV = "REMOVEFAV",
  SETFAV = "SETFAV",
}

interface UserState {
  favourites: string[]; // Adjust the type based on what your IDs are
}

export const initialUserState = {
  favourites: [],
};

interface AddRemoveFavAction extends Action {
  type: typeof userActions.ADDFAV | typeof userActions.REMOVEFAV;
  payload: string;
}

interface SetFavAction extends Action {
  type: typeof userActions.SETFAV;
  payload: string[];
}

type UserActionTypes = AddRemoveFavAction | SetFavAction;

export const userReducer: Reducer<UserState, UserActionTypes> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
  case userActions.SETFAV:
    return { favourites: action.payload };
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
