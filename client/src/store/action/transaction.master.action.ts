import { AppStore } from "@/interface/generic.model";
import {
  ITransactionModel,
} from "@/interface/transaction";

export const ADD_TRANSACTION_MASTER_REQUEST = "ADD_TRANSACTION_MASTER_REQUEST";
export const ADD_TRANSACTION_MASTER_SUCCESS = "ADD_TRANSACTION_MASTER_SUCCESS";
export const ADD_TRANSACTION_MASTER_FAILED = "ADD_TRANSACTION_MASTER_FAILED";

export const FETCH_ALL_TRANSACTION_MASTER_REQUEST =
  "FETCH_ALL_TRANSACTION_MASTER_REQUEST";
export const FETCH_ALL_TRANSACTION_MASTER_SUCCESS =
  "FETCH_ALL_TRANSACTION_MASTER_SUCCESS";
export const FETCH_ALL_TRANSACTION_MASTER_FAILED =
  "FETCH_ALL_TRANSACTION_MASTER_FAILED";

//FETCH BY ID

export const FETCH_TRANSACTION_MASTER_BY_ID_REQUEST =
  "FETCH_TRANSACTION_MASTER_BY_ID_REQUEST";
export const FETCH_TRANSACTION_MASTER_BY_ID_SUCCESS =
  "FETCH_TRANSACTION_MASTER_BY_ID_SUCCESS";
export const FETCH_TRANSACTION_MASTER_BY_ID_FAILED =
  "FETCH_TRANSACTION_MASTER_BY_ID_FAILED";

export const DELETE_TRANSACTION_MASTER_REQUEST =
  "DELETE_TRANSACTION_MASTER_REQUEST";
export const DELETE_TRANSACTION_MASTER_SUCCESS =
  "DELETE_TRANSACTION_MASTER_SUCCESS";
export const DELETE_TRANSACTION_MASTER_FAILED =
  "DELETE_TRANSACTION_MASTER_FAILED";

//ADD ALL
export interface IAddTransactionMasterRequestAction {
  type: typeof ADD_TRANSACTION_MASTER_REQUEST;
  payload: any;
}

export interface IAddTransactionMasterSuccessAction {
  type: typeof ADD_TRANSACTION_MASTER_SUCCESS;
  payload: AppStore<ITransactionModel>;
}

export interface IAddTransactionMasterFailedAction {
  type: typeof ADD_TRANSACTION_MASTER_FAILED;
  payload: AppStore<ITransactionModel>;
}

//FETCH ALL

export interface IFetchTransactionMasterRequestAction {
  type: typeof FETCH_ALL_TRANSACTION_MASTER_REQUEST;
}

export interface IFetchTransactionMasterSuccessAction {
  type: typeof FETCH_ALL_TRANSACTION_MASTER_SUCCESS;
  payload: AppStore<ITransactionModel[]>;
}

export interface IFetchTransactionMasterFailedAction {
  type: typeof FETCH_ALL_TRANSACTION_MASTER_FAILED;
  payload: AppStore<ITransactionModel[]>;
}

export interface IFetchTransactionMasterBYIdRequestAction {
  type: typeof FETCH_TRANSACTION_MASTER_BY_ID_REQUEST;
  payload: string;
}

export interface IFetchTransactionMasterBYIdSuccessAction {
  type: typeof FETCH_TRANSACTION_MASTER_BY_ID_SUCCESS;
  payload: AppStore<ITransactionModel[]>;
}

export interface IFetchTransactionMasterBYIdFailureAction {
  type: typeof FETCH_TRANSACTION_MASTER_BY_ID_FAILED;
  payload: AppStore<ITransactionModel[]>;
}

//DELETE
export interface IDeleteTransactionMasterRequestAction {
  type: typeof DELETE_TRANSACTION_MASTER_REQUEST;
  payload: string;
}

export interface IDeleteTransactionMasterSuccessAction {
  type: typeof DELETE_TRANSACTION_MASTER_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteTransactionMasterFailedAction {
  type: typeof DELETE_TRANSACTION_MASTER_FAILED;
  payload: AppStore<string>;
}

// UPDATE
export const addTransactionMasterRequest = (
  payload: any
): IAddTransactionMasterRequestAction => ({
  type: ADD_TRANSACTION_MASTER_REQUEST,
  payload,
});

export const addTransactionMasterSuccess = (
  payload: AppStore<ITransactionModel>
): IAddTransactionMasterSuccessAction => ({
  type: ADD_TRANSACTION_MASTER_SUCCESS,
  payload,
});

export const addTransactionMasterFailed = (
  payload: AppStore<ITransactionModel>
): IAddTransactionMasterFailedAction => ({
  type: ADD_TRANSACTION_MASTER_FAILED,
  payload,
});

//FETCH ALL

//#region - Action functions
export const fetchTransactionMasterRequest = (
): IFetchTransactionMasterRequestAction => ({
  type: FETCH_ALL_TRANSACTION_MASTER_REQUEST,
});

export const fetchTransactionMasterSuccess = (
  payload: AppStore<ITransactionModel[]>
): IFetchTransactionMasterSuccessAction => ({
  type: FETCH_ALL_TRANSACTION_MASTER_SUCCESS,
  payload,
});

export const fetchTransactionMasterFailed = (
  payload: AppStore<ITransactionModel[]>
): IFetchTransactionMasterFailedAction => ({
  type: FETCH_ALL_TRANSACTION_MASTER_FAILED,
  payload,
});

export const deleteTransactionMasterRequest = (
  payload: string
): IDeleteTransactionMasterRequestAction => ({
  type: DELETE_TRANSACTION_MASTER_REQUEST,
  payload,
});

export const deleteTransactionMasterSuccess = (
  payload: AppStore<string>
): IDeleteTransactionMasterSuccessAction => ({
  type: DELETE_TRANSACTION_MASTER_SUCCESS,
  payload,
});

export const deleteTransactionMasterFailed = (
  payload: AppStore<string>
): IDeleteTransactionMasterFailedAction => ({
  type: DELETE_TRANSACTION_MASTER_FAILED,
  payload,
});

export const fetchTransactionMasterBYIdRequest = (
  payload: string
): IFetchTransactionMasterBYIdRequestAction => ({
  type: FETCH_TRANSACTION_MASTER_BY_ID_REQUEST,
  payload,
});

export const fetchTransactionMasterBYIdSuccess = (
  payload: AppStore<ITransactionModel[]>
): IFetchTransactionMasterBYIdSuccessAction => ({
  type: FETCH_TRANSACTION_MASTER_BY_ID_SUCCESS,
  payload,
});

export const fetchTransactionMasterBYIdFailed = (
  payload: AppStore<ITransactionModel[]>
): IFetchTransactionMasterBYIdFailureAction => ({
  type: FETCH_TRANSACTION_MASTER_BY_ID_FAILED,
  payload,
});

export type TransactionMasterActionTypes =
  | IAddTransactionMasterRequestAction
  | IAddTransactionMasterSuccessAction
  | IAddTransactionMasterFailedAction
  | IFetchTransactionMasterRequestAction
  | IFetchTransactionMasterSuccessAction
  | IFetchTransactionMasterFailedAction
  | IDeleteTransactionMasterRequestAction
  | IDeleteTransactionMasterSuccessAction
  | IDeleteTransactionMasterFailedAction
  | IFetchTransactionMasterBYIdRequestAction
  | IFetchTransactionMasterBYIdSuccessAction
  | IFetchTransactionMasterBYIdFailureAction;
