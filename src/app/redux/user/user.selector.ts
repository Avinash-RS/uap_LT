import { createFeatureSelector, createSelector } from "@ngrx/store";

export const USER_STATE_NAMW = 'user';

const getUserState = createFeatureSelector(USER_STATE_NAMW);

export const getUserProfile = createSelector(getUserState, (state)=> {
    return state;
});