import { loginState } from './login-model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const USER_STATE_NAMW = 'login';

export const getLoginState = createFeatureSelector(USER_STATE_NAMW);

export const getLoginProfile = createSelector(getLoginState, (state)=> {
    return state;
});

export const getAssessmentIDSelector = createSelector(getLoginState, (state: any)=> {
    return state && state.assessmentId ? state.assessmentId : null;
})