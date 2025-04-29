import { AppStore } from "@/interface/generic.model";
import {
  IUserModel,
  UserModel,
} from "@/interface/user.model";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILED = "ADD_USER_FAILED";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILED = "FETCH_USER_FAILED ";

export const FETCH_BY_ID_USER_REQUEST = "FETCH_BY_ID_USER_REQUEST";
export const FETCH_BY_ID_USER_SUCCESS = "FETCH_BY_ID_USER_SUCCESS";
export const FETCH_BY_ID_USER_FAILED = "FETCH_BY_ID_USER_FAILED";

export const FILTER_FETCH_USER_REQUEST = "FILTER_FETCH_USER_REQUEST";
export const FILTER_FETCH_USER_SUCCESS = "FILTER_FETCH_USER_SUCCESS";
export const FILTER_FETCH_USER_FAILED = "FILTER_FETCH_USER_FAILED ";


export const FILTER_FETCH_CONSUMER_REQUEST = "FILTER_FETCH_CONSUMER_REQUEST";
export const FILTER_FETCH_CONSUMER_SUCCESS = "FILTER_FETCH_CONSUMER_SUCCESS";
export const FILTER_FETCH_CONSUMER_FAILED = "FILTER_FETCH_CONSUMER_FAILED ";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED ";

export const RESET_DELETE_USER = "RESET_DELETE_USER";


//ADD ALL
export interface IAddUserRequestAction {
  type: typeof ADD_USER_REQUEST;
  payload: any;
}

export interface IAddUserSuccessAction {
  type: typeof ADD_USER_SUCCESS;
  payload: AppStore<IUserModel>;
}

export interface IAddUserFailedAction {
  type: typeof ADD_USER_FAILED;
  payload: AppStore<IUserModel>;
}
//FETCH ALL
export interface IFetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
  payload: any;
}

export interface IFetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: AppStore<UserModel[]>;
}

export interface IFetchUserFailedAction {
  type: typeof FETCH_USER_FAILED;
  payload: AppStore<UserModel[]>;
}

//FETCH_BY_ID
export interface IFecthUserByIdRequestAction {
  type: typeof FETCH_BY_ID_USER_REQUEST;
  payload: string;
}
export interface IFetchUserByIdSuccessAction {
  type: typeof FETCH_BY_ID_USER_SUCCESS;
  payload: AppStore<IUserModel[]>;
}

export interface IFetchUserByIdFailureAction {
  type: typeof FETCH_BY_ID_USER_FAILED;
  payload: AppStore<IUserModel[]>;
}

//FILTER CONSUMER FETCH ALL
export interface IFilterFetchUserRequestAction {
  type: typeof FILTER_FETCH_USER_REQUEST;
  payload: any;
}

export interface IFilterFetchUserSuccessAction {
  type: typeof FILTER_FETCH_USER_SUCCESS;
  payload: AppStore<UserModel[]>;
}

export interface IFilterFetchUserFailedAction {
  type: typeof FILTER_FETCH_USER_FAILED;
  payload: AppStore<UserModel[]>;
}

//FILTER CONSUMER FETCH ALL
export interface IFilterFetchConsumerRequestAction {
  type: typeof FILTER_FETCH_CONSUMER_REQUEST;
  payload: any;
}

export interface IFilterFetchConsumerSuccessAction {
  type: typeof FILTER_FETCH_CONSUMER_SUCCESS;
  payload: AppStore<UserModel[]>;
}

export interface IFilterFetchConsumerFailedAction {
  type: typeof FILTER_FETCH_CONSUMER_FAILED;
  payload: AppStore<UserModel[]>;
}

//DELETE
export interface IDeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST;
  payload: string;
}

export interface IDeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteUserFailedAction {
  type: typeof DELETE_USER_FAILED;
  payload: AppStore<string>;
}

export interface IResetDeleteUser {
  type: typeof RESET_DELETE_USER  ;
}


// UPDATE
export const addUserRequest = (payload: any): IAddUserRequestAction => ({
  type: ADD_USER_REQUEST,
  payload,
});

export const addUserSuccess = (
  payload: AppStore<IUserModel>
): IAddUserSuccessAction => ({
  type: ADD_USER_SUCCESS,
  payload,
});

export const addUserFailed = (
  payload: AppStore<IUserModel>
): IAddUserFailedAction => ({
  type: ADD_USER_FAILED,
  payload,
});

//FETCH ALL
export const fetchUserRequest = (
  payload: any
): IFetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
  payload,
});

export const fetchUserSuccess = (
  payload: AppStore<UserModel[]>
): IFetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailed = (
  payload: AppStore<UserModel[]>
): IFetchUserFailedAction => ({
  type: FETCH_USER_FAILED,
  payload,
});

//FETCH_BY_ID
export const fetchByIdUserRequest = (
  payload: string
): IFecthUserByIdRequestAction => ({
  type: FETCH_BY_ID_USER_REQUEST,
  payload,
});

export const fetchByIdUserSuccess = (
  payload: AppStore<IUserModel[]>
): IFetchUserByIdSuccessAction => ({
  type: FETCH_BY_ID_USER_SUCCESS,
  payload,
});

export const fetchByIdUserFailed = (
  payload: AppStore<IUserModel[]>
): IFetchUserByIdFailureAction => ({
  type: FETCH_BY_ID_USER_FAILED,
  payload,
});

//FILTER FETCH ALL

export const filterFetchUserRequest = (
  payload: any
): IFilterFetchUserRequestAction => ({
  type: FILTER_FETCH_USER_REQUEST,
  payload,
});

export const filterFetchUserSuccess = (
  payload: AppStore<UserModel[]>
): IFilterFetchUserSuccessAction => ({
  type: FILTER_FETCH_USER_SUCCESS,
  payload,
});

export const filterFetchUserFailed = (
  payload: AppStore<UserModel[]>
): IFilterFetchUserFailedAction => ({
  type: FILTER_FETCH_USER_FAILED,
  payload,
});

//FILTER FETCH ALL

export const filterFetchConsumerRequest = (
  payload: any
): IFilterFetchConsumerRequestAction => ({
  type: FILTER_FETCH_CONSUMER_REQUEST,
  payload,
});

export const filterFetchConsumerSuccess = (
  payload: AppStore<UserModel[]>
): IFilterFetchConsumerSuccessAction => ({
  type: FILTER_FETCH_CONSUMER_SUCCESS,
  payload,
});

export const filterFetchConsumerFailed = (
  payload: AppStore<UserModel[]>
): IFilterFetchConsumerFailedAction => ({
  type: FILTER_FETCH_CONSUMER_FAILED,
  payload,
});

// export const deleteUserRequest = (
//   payload: string
// ): IDeleteUserRequestAction => ({
//   type: DELETE_USER_REQUEST,
//   payload,
// });

export const deleteUserSuccess = (
  payload: AppStore<string>
): IDeleteUserSuccessAction => ({
  type: DELETE_USER_SUCCESS,
  payload,
});

// DELETE
export const deleteUserRequest = (
  payload: string
): IDeleteUserRequestAction => ({
  type: DELETE_USER_REQUEST,
  payload,
});

export const deleteUserFailed = (
  payload: AppStore<string>
): IDeleteUserFailedAction => ({
  type: DELETE_USER_FAILED,
  payload,
});

export const resetDeleteUser = (): IResetDeleteUser => ({
  type: RESET_DELETE_USER,
});


export type UserAction =
  | IAddUserRequestAction
  | IAddUserSuccessAction
  | IAddUserFailedAction
  | IFetchUserRequestAction
  | IFetchUserSuccessAction
  | IFetchUserFailedAction
  | IFecthUserByIdRequestAction
  | IFetchUserByIdFailureAction
  | IFetchUserByIdSuccessAction
  | IFilterFetchUserRequestAction
  | IFilterFetchUserSuccessAction
  | IFilterFetchUserFailedAction
  | IFilterFetchConsumerRequestAction
  | IFilterFetchConsumerSuccessAction
  | IFilterFetchConsumerFailedAction
  | IDeleteUserRequestAction
  | IDeleteUserSuccessAction
  | IDeleteUserFailedAction
  | IResetDeleteUser;
