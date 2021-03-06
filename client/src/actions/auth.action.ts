import jwt_decode from "jwt-decode";
import authApi from "../api/auth.api";
import env from "../configs/env";
import {
  NOTIFICATION_FAIL,
  NOTIFICATION_SUCCESS, UPDATE_NOTIFY, USER_INFO_FAIL, USER_INFO_REQUEST,
  USER_INFO_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_OAUTH_FAIL, USER_LOGIN_OAUTH_REQUEST,
  USER_LOGIN_OAUTH_SUCCESS, USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS, USER_LOGOUT,
  USER_UPDATE_HEADER
} from "../constants";
import {
  ILoginOAuth, INotification, IPayload, ISigninInput, ISignUpInput, IUserHeader, IUserSummary
} from "../interfaces";
import { IS_BLOCKED, LOGIN_FAIL, LOGIN_SUCCESS, SIGNUP_SUCCESS, UN_VERIFY } from '../messages';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from './../constants';
import { ILogoutType } from './../interfaces/auth.interface';



export const signIn = (data: ISigninInput) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const result = await authApi.signIn(data);

    if (!result || result.status !== 200) throw new Error();

    if (result.data.message === "UN_VERIFY") {
      dispatch({
        type: NOTIFICATION_FAIL,
        payload: UN_VERIFY
      })
  
      return;
    }
    if (result.data.message === "IS_BLOCKED") {
      dispatch({
        type: NOTIFICATION_FAIL,
        payload: IS_BLOCKED
      })
  
      return;
    }

    dispatch({
      type: NOTIFICATION_SUCCESS,
      payload: LOGIN_SUCCESS
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: result.data.payload,
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_FAIL,
      payload: LOGIN_FAIL
    })

    dispatch({
      type: USER_LOGIN_FAIL,
    });
  }
};

export const signUp = (data: ISignUpInput) => async (dispatch) => {

  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const result = await authApi.signUp(data);

    if (result.status !== 200)
      throw new Error();

    dispatch({
      type: NOTIFICATION_SUCCESS,
      payload: SIGNUP_SUCCESS
    })
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
    dispatch({
      type: USER_LOGOUT,
    });
  }
};


export const updateUserHeader = (data: IUserSummary) =>
  async (dispatch: (args: IUserHeader) => (IUserHeader)) => {

    try {
      const token = localStorage.getItem(env.REACT_APP_ACCESS_TOKEN);
      const userID: number = jwt_decode<IPayload>(token!)?.sub;

      if (!userID)
        throw new Error();

      dispatch({
        type: USER_UPDATE_HEADER,
        payload: data
      })
    } catch (err) {
      console.log(err);
    }
  };

export const loginOAuth = (data: ILoginOAuth) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_OAUTH_REQUEST,
      })

      const result = await authApi.loginOAuth(data);
      if (result.status !== 200) throw new Error();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: SIGNUP_SUCCESS
      })
      dispatch({
        type: USER_LOGIN_OAUTH_SUCCESS,
        payload: result.data.payload,
      })
    } catch (err) {
      dispatch({
        type: USER_LOGIN_OAUTH_FAIL
      })
    }
  }


export const updateNotifyState = (notifyId: number) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_NOTIFY,
        payload: notifyId
      })
    } catch (err) {

    }
  }