import { createFeatureSelector, createSelector } from "@ngrx/store";

export const USER_STATE_NAMW = 'login';

const getLoginState = createFeatureSelector(USER_STATE_NAMW);

export const getLoginProfile = createSelector(getLoginState, (state)=> {
    return state;
});