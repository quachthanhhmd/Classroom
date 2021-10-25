import { ILogoutType } from './../interfaces/auth.interface';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from './../constants';
import jwt_decode from "jwt-decode";
import authApi from "../api/auth.api";
import {
  ISignInType,
  ISigninInput,
  IPayload,
  IUserHeader,
  ISignUpInput,
  ISignUpType
} from "../interfaces";

import env from "../configs/env";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_LOGOUT
} from "../constants";


export const signIn = (data: ISigninInput) => async (dispatch: (args: ISignInType) => (ISignInType)) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
  
    const result = await authApi.signIn(data);
    console.log(result);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: result.data.payload,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
    });
  }
};

export const signUp = (data: ISignUpInput) => async (dispatch: (args: ISignUpType) => (ISignUpType)) => {

  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const result = await authApi.signUp(data);

    if (result.status !== 200)
      throw new Error();

    dispatch({ type: USER_REGISTER_SUCCESS, payload: null });

  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL })
  }
}

export const getUserData = () => async (dispatch: (args: IUserHeader) => (IUserHeader)) => {
  try {
    dispatch({ type: USER_INFO_REQUEST });

    const token = localStorage.getItem(env.REACT_APP_ACCESS_TOKEN);
    const userID: number = jwt_decode<IPayload>(token!)?.sub;

    if (!userID)
      throw new Error();

    const result = await authApi.getInfo(userID);

    if (!result) {
      dispatch({ type: USER_INFO_FAIL });
      return;
    }

    dispatch({
      type: USER_INFO_SUCCESS,
      payload: result.data.payload,
    });
  } catch (error) {
    dispatch({ type: USER_INFO_FAIL });
  }
};


export const signOut = () => async (dispatch: (args: ILogoutType) => (ILogoutType)) => {
  try {
    const refreshToken = localStorage.getItem(env.REACT_APP_REFRESH_TOKEN);
    if (!refreshToken)
      throw new Error();

    await authApi.logout({
      refreshToken
    });

    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGOUT,
    });
  }
};
