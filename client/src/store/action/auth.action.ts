import { AuthenticationModel } from "@/interface/auth.model";
import { AppStore } from "@/interface/generic.model";

export const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAILED = "AUTHENTICATE_USER_FAILED";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";


//#region - Action interfaces
export interface IAuthenticationRequestAction {
    type: typeof AUTHENTICATE_USER_REQUEST;
    payload: any;
  }
  
  export interface IAuthenticationSuccessAction {
    type: typeof AUTHENTICATE_USER_SUCCESS;
    payload: any;
  }
  
  export interface IAuthenticationFailureAction {
    type: typeof AUTHENTICATE_USER_FAILED;
    payload: AppStore<AuthenticationModel>;
  }

  export interface ILogoutUserRequestAction {
    type: typeof LOGOUT_USER_REQUEST;
    payload: any;
  }

export interface IForgetPasswordRequestAction {
  type: typeof FORGOT_PASSWORD_REQUEST;
  payload: AuthenticationModel;
}

export interface IForgetPasswordSuccessAction {
  type: typeof FORGOT_PASSWORD_SUCCESS;
  payload: AppStore<AuthenticationModel>;
}

export interface IForgetPasswordFailureAction {
  type: typeof FORGOT_PASSWORD_FAILED;
  payload: AppStore<AuthenticationModel>;
}


  //#region - Action functions
export const authenticateRequest = (
    payload: any
  ): IAuthenticationRequestAction => ({
    type: AUTHENTICATE_USER_REQUEST,
    payload,
  });
  
  export const authenticateSuccess = (
    payload: any,
  ): IAuthenticationSuccessAction => ({
    type: AUTHENTICATE_USER_SUCCESS,
    payload,
  });
  
  export const authenticateFailed = (
    payload: AppStore<AuthenticationModel>
  ): IAuthenticationFailureAction => ({
    type: AUTHENTICATE_USER_FAILED,
    payload,
  });

  export const logoutUserRequest = (payload: any): ILogoutUserRequestAction => ({
    type: LOGOUT_USER_REQUEST,
    payload,
  });

  //UPDATE
  export const forgetPasswordRequest = (
    payload: AuthenticationModel
  ): IForgetPasswordRequestAction => ({
    type: FORGOT_PASSWORD_REQUEST,
    payload,
  });
  
  export const forgetPasswordSuccess = (
    payload: AppStore<AuthenticationModel>
  ): IForgetPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  });
  
  export const forgetPasswordFailed = (
    payload: AppStore<AuthenticationModel>
  ): IForgetPasswordFailureAction => ({
    type: FORGOT_PASSWORD_FAILED,
    payload,
  });


  export type AuthenticateActions =
  | IAuthenticationRequestAction
  | IAuthenticationSuccessAction
  | IAuthenticationFailureAction
  | ILogoutUserRequestAction
  | IForgetPasswordRequestAction
  | IForgetPasswordSuccessAction
  | IForgetPasswordFailureAction;