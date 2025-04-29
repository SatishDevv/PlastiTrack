import { AppStore } from "@/interface/generic.model";
import {
  IStatusModel,
  StatusModel,
} from "@/interface/status.model";

export const ADD_STATUS_REQUEST = "ADD_STATUS_REQUEST";
export const ADD_STATUS_SUCCESS = "ADD_STATUS_SUCCESS";
export const ADD_STATUS_FAILED = "ADD_STATUS_FAILED";

export const FETCH_BY_ID_STATUS_REQUEST = "FETCH_BY_ID_STATUS_REQUEST";
export const FETCH_BY_ID_STATUS_SUCCESS = "FETCH_BY_ID_STATUS_SUCCESS";
export const FETCH_BY_ID_STATUS_FAILED = "FETCH_BY_ID_STATUS_FAILED";

export const FETCH_STATUS_REQUEST = "FETCH_STATUS_REQUEST";
export const FETCH_STATUS_SUCCESS = "FETCH_STATUS_SUCCESS";
export const FETCH_STATUS_FAILED = "FETCH_STATUS_FAILED ";

export const DELETE_STATUS_REQUEST = "DELETE_STATUS_REQUEST";
export const DELETE_STATUS_SUCCESS = "DELETE_STATUS_SUCCESS";
export const DELETE_STATUS_FAILED = "DELETE_STATUS_FAILED ";

export const RESET_DELETE_STATUS = "RESET_DELETE_STATUS";


//ADD ALL=#region - Action interfaces
export interface IAddStatusRequestAction {
  type: typeof ADD_STATUS_REQUEST;
  payload: IStatusModel;
}

export interface IAddStatusSuccessAction {
  type: typeof ADD_STATUS_SUCCESS;
  payload: AppStore<IStatusModel>;
}

export interface IAddStatusFailureAction {
  type: typeof ADD_STATUS_FAILED;
  payload: AppStore<IStatusModel>;
}
//FETCH BY ID

export interface IFetchByIdAddStatusRequestAction {
  type: typeof FETCH_BY_ID_STATUS_REQUEST;
  payload: string;
}

export interface IFetchByIdAddStatusSuccessAction {
  type: typeof FETCH_BY_ID_STATUS_SUCCESS;
  payload: AppStore<IStatusModel[]>;
}

export interface IFetchByIdAddStatusFailureAction {
  type: typeof FETCH_BY_ID_STATUS_FAILED;
  payload: AppStore<IStatusModel[]>;
}

//FETCH ALL
export interface IFetchStatusRequestAction {
  type: typeof FETCH_STATUS_REQUEST;
}
export interface IFetchStatusSuccessAction {
  type: typeof FETCH_STATUS_SUCCESS;
  payload: AppStore<StatusModel[]>;
}

export interface IFetchStatusFailureAction {
  type: typeof FETCH_STATUS_FAILED;
  payload: AppStore<StatusModel[]>;
}

export interface IResetDeleteStatus {
  type: typeof RESET_DELETE_STATUS;
}

//DELETE
export interface IDeleteStatusRequestAction {
  type: typeof DELETE_STATUS_REQUEST;
  payload: string;
}

export interface IDeleteStatusSuccessAction {
  type: typeof DELETE_STATUS_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteStatusFailedAction {
  type: typeof DELETE_STATUS_FAILED;
  payload: AppStore<string>;
}

//UPDATE
export const addStatusRequest = (
  payload: IStatusModel
): IAddStatusRequestAction => ({
  type: ADD_STATUS_REQUEST,
  payload,
});
export const addStatusSuccess = (
  payload: AppStore<IStatusModel>
): IAddStatusSuccessAction => ({
  type: ADD_STATUS_SUCCESS,
  payload,
});
export const addStatusFailed = (
  payload: AppStore<IStatusModel>
): IAddStatusFailureAction => ({
  type: ADD_STATUS_FAILED,
  payload,
});
//FETCH ALL

//#region - Action functions
export const fetchStatusRequest = (
): IFetchStatusRequestAction => ({
  type: FETCH_STATUS_REQUEST,
});

export const fetchStatusSuccess = (
  payload: AppStore<StatusModel[]>
): IFetchStatusSuccessAction => ({
  type: FETCH_STATUS_SUCCESS,
  payload,
});

export const fetchStatusFailed = (
  payload: AppStore<StatusModel[]>
): IFetchStatusFailureAction => ({
  type: FETCH_STATUS_FAILED,
  payload,
});
//FETCH BY ID
export const fetchbyidaddStatusRequest = (
  payload: string
): IFetchByIdAddStatusRequestAction => ({
  type: FETCH_BY_ID_STATUS_REQUEST,
  payload,
});

export const fetchbyidaddStatusSuccess = (
  payload: AppStore<IStatusModel[]>
): IFetchByIdAddStatusSuccessAction => ({
  type: FETCH_BY_ID_STATUS_SUCCESS,
  payload,
});

export const fetchbyidaddStatusFailed = (
  payload: AppStore<IStatusModel[]>
): IFetchByIdAddStatusFailureAction => ({
  type: FETCH_BY_ID_STATUS_FAILED,
  payload,
});

export const deleteStatusRequest = (
  payload: string
): IDeleteStatusRequestAction => ({
  type: DELETE_STATUS_REQUEST,
  payload,
});

export const deleteStatusSuccess = (
  payload: AppStore<string>
): IDeleteStatusSuccessAction => ({
  type: DELETE_STATUS_SUCCESS,
  payload,
});

export const deleteStatusFailed = (
  payload: AppStore<string>
): IDeleteStatusFailedAction => ({
  type: DELETE_STATUS_FAILED,
  payload,
});


export const resetDeleteStatus = (): IResetDeleteStatus => ({
  type: RESET_DELETE_STATUS,
});

export type StatusActions =
  | IAddStatusRequestAction
  | IAddStatusSuccessAction
  | IAddStatusFailureAction
  | IFetchStatusRequestAction
  | IFetchStatusSuccessAction
  | IFetchStatusFailureAction
  | IFetchByIdAddStatusRequestAction
  | IFetchByIdAddStatusSuccessAction
  | IFetchByIdAddStatusFailureAction
  | IDeleteStatusRequestAction
  | IDeleteStatusSuccessAction
  | IDeleteStatusFailedAction
  | IResetDeleteStatus;
