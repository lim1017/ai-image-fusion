import { InitialState } from "./store";

export const selectState = (state: InitialState) => state;

export const selectUser = (state: InitialState) => state.user;
