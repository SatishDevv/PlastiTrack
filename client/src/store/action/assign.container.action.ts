import {
  AssignContainerModel,
  IAssignContainerModel,
  IAssignContainerRequestModel,
} from "@/interface/assign.container";
import { AppStore } from "@/interface/generic.model";

export const FETCH_ASSIGNMENT_CONTAINER_REQUEST =
  "FETCH_ASSIGNMENT_CONTAINER_REQUEST";
export const FETCH_ASSIGNMENT_CONTAINER_SUCCESS =
  "FETCH_ASSIGNMENT_CONTAINER_SUCCESS";
export const FETCH_ASSIGNMENT_CONTAINER_FAILED =
  "FETCH_ASSIGNMENT_CONTAINER_FAILED";

export const FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST =
  "FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST";
export const FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_SUCCESS =
  "FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_SUCCESS";
export const FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_FAILED =
  "FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_FAILED";

//GET ALL TRANSACTIONS

export const FETCH_CONTAINER_TRANSACTIONS_REQUEST =
  "FETCH_CONTAINER_TRANSACTIONS_REQUEST";
export const FETCH_CONTAINER_TRANSACTIONS_SUCCESS =
  "FETCH_CONTAINER_TRANSACTIONS_SUCCESS";
export const FETCH_CONTAINER_TRANSACTIONS_FAILED =
  "FETCH_CONTAINER_TRANSACTIONS_FAILED";

//fetch by id
export const FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST =
  "FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST";
export const FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS =
  "FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS";
export const FETCH_ASSIGNMENT_CONTAINER_BY_ID_FAILED =
  "FETCH_ASSIGNMENT_CONTAINER_BY_ID_FAILED";

//FLEXIBLE APIS FOR FETCH ASSIGNED CONTAINER AND QUANTITY

export const FETCH_ALL_TRANSACTION_REQUEST = "FETCH_ALL_TRANSACTION_REQUEST";
export const FETCH_ALL_TRANSACTION_SUCCESS = "FETCH_ALL_TRANSACTION_SUCCESS";
export const FETCH_ALL_TRANSACTION_FAILED = "FETCH_ALL_TRANSACTION_FAILED ";

export const FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST =
  "FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST";
export const FETCH_ASSIGNED_CONTAINER_COUNT_SUCCESS =
  "FETCH_ASSIGNED_CONTAINER_COUNT_SUCCESS";
export const FETCH_ASSIGNED_CONTAINER_COUNT_FAILED =
  "FETCH_ASSIGNED_CONTAINER_COUNT_FAILED";

//DASHBOARED API

export const ALERT_LATEST_TRANSACTION_REQUEST =
  "ALERT_LATEST_TRANSACTION_REQUEST";
export const ALERT_LATEST_TRANSACTION_SUCCESS =
  "ALERT_LATEST_TRANSACTION_SUCCESS";
export const ALERT_LATEST_TRANSACTION_FAILED =
  "ALERT_LATEST_TRANSACTION_FAILED";

export const FETCH_ALL_COUNT_TRANSACTION_REQUEST =
  "FETCH_ALL_COUNT_TRANSACTION_REQUEST";
export const FETCH_ALL_COUNT_TRANSACTION_SUCCESS =
  "FETCH_ALL_COUNT_TRANSACTION_SUCCESS";
export const FETCH_ALL_COUNT_TRANSACTION_FAILED =
  "FETCH_ALL_COUNT_TRANSACTION_FAILED";

export const DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST =
  "DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST";
export const DISPATCH_ASSIGNMENT_FOR_CONSUMER_SUCCESS =
  "DISPATCH_ASSIGNMENT_FOR_CONSUMER_SUCCESS";
export const DISPATCH_ASSIGNMENT_FOR_CONSUMER_FAILED =
  "DISPATCH_ASSIGNMENT_FOR_CONSUMER_FAILED";

export const FETCH_USER_STOCK_MANAGEMENT_REQUEST =
  "FETCH_USER_STOCK_MANAGEMENT_REQUEST";
export const FETCH_USER_STOCK_MANAGEMENT_SUCCESS =
  "FETCH_USER_STOCK_MANAGEMENT_SUCCESS";
export const FETCH_USER_STOCK_MANAGEMENT_FAILED =
  "FETCH_USER_STOCK_MANAGEMENT_FAILED";

export const DELETE_ASSIGNMENT_CONTAINER_REQUEST =
  "DELETE_ASSIGNMENT_CONTAINER_REQUEST";
export const DELETE_ASSIGNMENT_CONTAINER_SUCCESS =
  "DELETE_ASSIGNMENT_CONTAINER_SUCCESS";
export const DELETE_ASSIGNMENT_CONTAINER_FAILED =
  "DELETE_ASSIGNMENT_CONTAINER_FAILED";

export const FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST =
  "FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST";
export const FETCH_ASSIGNMENT_TRANSACTION_BY_ID_SUCCESS =
  "FETCH_ASSIGNMENT_TRANSACTION_BY_ID_SUCCESS";
export const FETCH_ASSIGNMENT_TRANSACTION_BY_ID_FAILED =
  "FETCH_ASSIGNMENT_TRANSACTION_BY_ID_FAILED";

export const RECEIVE_ASSIGNMENT_FOR_USER_REQUEST =
  "RECEIVE_ASSIGNMENT_FOR_USER_REQUEST";
export const RECEIVE_ASSIGNMENT_FOR_USER_SUCCESS =
  "RECEIVE_ASSIGNMENT_FOR_USER_SUCCESS";
export const RECEIVE_ASSIGNMENT_FOR_USER_FAILED =
  "RECEIVE_ASSIGNMENT_FOR_USER_FAILED";

//DASHBOARD "COUNT"

export interface IFetchAllCountTransactionRequestAction {
  type: typeof FETCH_ALL_COUNT_TRANSACTION_REQUEST;
}

export interface IFetchAllCountTransactionSuccessAction {
  type: typeof FETCH_ALL_COUNT_TRANSACTION_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IFetchAllCountTransactionFailedAction {
  type: typeof FETCH_ALL_COUNT_TRANSACTION_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}

//FETCH BY ID
export interface IFetchAssignmentTransactionByIdRequestAction {
  type: typeof FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST;
  payload: string;
}

export interface IFetchAssignmentTransactionByIdSuccessAction {
  type: typeof FETCH_ASSIGNMENT_TRANSACTION_BY_ID_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IFetchAssignmentTransactionByIdFailureAction {
  type: typeof FETCH_ASSIGNMENT_TRANSACTION_BY_ID_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}

//FETCH ALL

export const fetchAllCountTransactionRequest =
  (): IFetchAllCountTransactionRequestAction => ({
    type: FETCH_ALL_COUNT_TRANSACTION_REQUEST,
  });

export const fetchAllCountTransactionSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchAllCountTransactionSuccessAction => ({
  type: FETCH_ALL_COUNT_TRANSACTION_SUCCESS,
  payload,
});

export const fetchAllCountTransactionFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchAllCountTransactionFailedAction => ({
  type: FETCH_ALL_COUNT_TRANSACTION_FAILED,
  payload,
});

//FETCH ALL
export interface IFetchAssignContainerRequestAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_REQUEST;
  payload: any;
}

export interface IFetchAssignContainerSuccessAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAssignContainerFailedAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

//FETCH ALL
export interface IFetchAssignContainerForReceiveRequestAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST;
  payload: any;
}

export interface IFetchAssignContainerForReceiveSuccessAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAssignContainerForReceiveFailedAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

//FETCH ALL
export interface IFetchContainerTransactionRequestAction {
  type: typeof FETCH_CONTAINER_TRANSACTIONS_REQUEST;
  payload: any;
}

export interface IFetchContainerTransactionSuccessAction {
  type: typeof FETCH_CONTAINER_TRANSACTIONS_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchContainerTransactionFailedAction {
  type: typeof FETCH_CONTAINER_TRANSACTIONS_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

//FETCH BY ID

export interface IFetchAssignContainerByIdRequestAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST;
  payload: string;
}

export interface IFetchAssignContainerByIdSucessAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAssignContainerByIdFailedAction {
  type: typeof FETCH_ASSIGNMENT_CONTAINER_BY_ID_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

///////////////
export interface IFetchAllTransactionRequestAction {
  type: typeof FETCH_ALL_TRANSACTION_REQUEST;
  payload: any;
}

export interface IFetchAllTransactionSuccessAction {
  type: typeof FETCH_ALL_TRANSACTION_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAllTransactionFailedAction {
  type: typeof FETCH_ALL_TRANSACTION_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAssignedContainerCountRequestAction {
  type: typeof FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST;
  payload: any;
}

export interface IFetchAssignedContainerCountSuccessAction {
  type: typeof FETCH_ASSIGNED_CONTAINER_COUNT_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAssignedContainerCountFailedAction {
  type: typeof FETCH_ASSIGNED_CONTAINER_COUNT_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

///////////////
export interface IFetchAllAlertLatestTransactionRequestAction {
  type: typeof ALERT_LATEST_TRANSACTION_REQUEST;
  payload: any;
}

export interface IFetchAllAlertLatestTransactionSuccessAction {
  type: typeof ALERT_LATEST_TRANSACTION_SUCCESS;
  payload: AppStore<AssignContainerModel[]>;
}

export interface IFetchAllAlertLatestTransactionFailedAction {
  type: typeof ALERT_LATEST_TRANSACTION_FAILED;
  payload: AppStore<AssignContainerModel[]>;
}

// DISPATCH FOR CONSUMER

export interface IDispatchAssignmentForConsumerRequest {
  type: typeof DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST;
  payload: any;
}

export interface IDispatchAssignmentForConsumerSuccess {
  type: typeof DISPATCH_ASSIGNMENT_FOR_CONSUMER_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IDispatchAssignmentForConsumerFailed {
  type: typeof DISPATCH_ASSIGNMENT_FOR_CONSUMER_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}

// DISPATCH FOR CONSUMER

export interface IReceiveAssignmentForUserRequest {
  type: typeof RECEIVE_ASSIGNMENT_FOR_USER_REQUEST;
  payload: any;
}

export interface IReceiveAssignmentForUserSuccess {
  type: typeof RECEIVE_ASSIGNMENT_FOR_USER_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IReceiveAssignmentForUserFailed {
  type: typeof RECEIVE_ASSIGNMENT_FOR_USER_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}

//FETCH USER STOCK MANAGEMENT

//DASHBOARD "COUNT"

export interface IFetchUserStockManagementRequestAction {
  type: typeof FETCH_USER_STOCK_MANAGEMENT_REQUEST;
  // payload: any;
}

export interface IFetchUserStockManagementSuccessAction {
  type: typeof FETCH_USER_STOCK_MANAGEMENT_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IFetchUserStockManagementFailedAction {
  type: typeof FETCH_USER_STOCK_MANAGEMENT_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IDeleteAssignmentContainerRequestAction {
  type: typeof DELETE_ASSIGNMENT_CONTAINER_REQUEST;
  payload: string;
}

export interface IDeleteAssignmentContainerSuccessAction {
  type: typeof DELETE_ASSIGNMENT_CONTAINER_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteAssignmentContainerFailedAction {
  type: typeof DELETE_ASSIGNMENT_CONTAINER_FAILED;
  payload: AppStore<string>;
}

//FETCH ALL

export const fetchAssignContainerRequest = (
  payload: any
): IFetchAssignContainerRequestAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_REQUEST,
  payload,
});

export const fetchAssignContainerSuccess = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignContainerSuccessAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_SUCCESS,
  payload,
});

export const fetchAssignContainerFailed = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignContainerFailedAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_FAILED,
  payload,
});

//FETCH ALL

export const fetchAssignContainerForReceiveRequest = (
  payload: any
): IFetchAssignContainerForReceiveRequestAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST,
  payload,
});

export const fetchAssignContainerForReceiveSuccess = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignContainerForReceiveSuccessAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_SUCCESS,
  payload,
});

export const fetchAssignContainerForReceiveFailed = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignContainerForReceiveFailedAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_FAILED,
  payload,
});

//FETCH BYT ID

export const fetchContainerAssignContainerByIdRequest = (
  payload: string
): IFetchAssignContainerByIdRequestAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST,
  payload,
});

export const fetchAssignContainerByIdSuccess = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignContainerByIdSucessAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS,
  payload,
});

export const fetchAssignContainerByIdFailed = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignContainerByIdFailedAction => ({
  type: FETCH_ASSIGNMENT_CONTAINER_BY_ID_FAILED,
  payload,
});

//////////////////////
export const fetchAssignedContainerCountRequest = (
  payload: any
): IFetchAssignedContainerCountRequestAction => ({
  type: FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST,
  payload,
});

export const fetchAssignedContainerCountSuccess = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignedContainerCountSuccessAction => ({
  type: FETCH_ASSIGNED_CONTAINER_COUNT_SUCCESS,
  payload,
});

export const fetchAssignedContainerCountFailed = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAssignedContainerCountFailedAction => ({
  type: FETCH_ASSIGNED_CONTAINER_COUNT_FAILED,
  payload,
});

//FETCH ALL

export const fetchContainerTransactionRequest = (
  payload: any
): IFetchContainerTransactionRequestAction => ({
  type: FETCH_CONTAINER_TRANSACTIONS_REQUEST,
  payload,
});

export const fetchContainerTransactionSuccess = (
  payload: AppStore<AssignContainerModel[]>
): IFetchContainerTransactionSuccessAction => ({
  type: FETCH_CONTAINER_TRANSACTIONS_SUCCESS,
  payload,
});

export const fetchContainerTransactionFailed = (
  payload: AppStore<AssignContainerModel[]>
): IFetchContainerTransactionFailedAction => ({
  type: FETCH_CONTAINER_TRANSACTIONS_FAILED,
  payload,
});

//FETCH ALL

export const fetchAllAlertLatestTransactionRequest = (
  payload: IAssignContainerRequestModel[]
): IFetchAllAlertLatestTransactionRequestAction => ({
  type: ALERT_LATEST_TRANSACTION_REQUEST,
  payload,
});

export const fetchAllAlertLatestTransactionSuccess = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAllAlertLatestTransactionSuccessAction => ({
  type: ALERT_LATEST_TRANSACTION_SUCCESS,
  payload,
});

export const fetchAllAlertLatestTransactionFailed = (
  payload: AppStore<AssignContainerModel[]>
): IFetchAllAlertLatestTransactionFailedAction => ({
  type: ALERT_LATEST_TRANSACTION_FAILED,
  payload,
});

// DISPATCH FOR CONSUMER
export const dispatchAssignmentForConsumerRequest = (
  payload: any
): IDispatchAssignmentForConsumerRequest => ({
  type: DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST,
  payload,
});

export const dispatchAssignmentForConsumerSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IDispatchAssignmentForConsumerSuccess => ({
  type: DISPATCH_ASSIGNMENT_FOR_CONSUMER_SUCCESS,
  payload,
});

export const dispatchAssignmentForConsumerFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IDispatchAssignmentForConsumerFailed => ({
  type: DISPATCH_ASSIGNMENT_FOR_CONSUMER_FAILED,
  payload,
});

// RECEIVE FOR CONSUMER
export const receiveAssignmentForUserRequest = (
  payload: any
): IReceiveAssignmentForUserRequest => ({
  type: RECEIVE_ASSIGNMENT_FOR_USER_REQUEST,
  payload,
});

export const receiveAssignmentForUserSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IReceiveAssignmentForUserSuccess => ({
  type: RECEIVE_ASSIGNMENT_FOR_USER_SUCCESS,
  payload,
});

export const receiveAssignmentForUserFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IReceiveAssignmentForUserFailed => ({
  type: RECEIVE_ASSIGNMENT_FOR_USER_FAILED,
  payload,
});

// FETCH USER STOCK MANAGEMENT

//FETCH ALL

export const fetchUserStockManagementRequest = (): // payload: any
IFetchUserStockManagementRequestAction => ({
  type: FETCH_USER_STOCK_MANAGEMENT_REQUEST,
  // payload,
});

export const fetchUserStockManagementSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchUserStockManagementSuccessAction => ({
  type: FETCH_USER_STOCK_MANAGEMENT_SUCCESS,
  payload,
});

export const fetchUserStockManagementFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchUserStockManagementFailedAction => ({
  type: FETCH_USER_STOCK_MANAGEMENT_FAILED,
  payload,
});

export const deleteAssignmentTransactionRequest = (
  payload: string
): IDeleteAssignmentContainerRequestAction => ({
  type: DELETE_ASSIGNMENT_CONTAINER_REQUEST,
  payload,
});

export const deleteAssignmentTransactionSuccess = (
  payload: AppStore<string>
): IDeleteAssignmentContainerSuccessAction => ({
  type: DELETE_ASSIGNMENT_CONTAINER_SUCCESS,
  payload,
});

export const deleteAssignmentTransactionFailed = (
  payload: AppStore<string>
): IDeleteAssignmentContainerFailedAction => ({
  type: DELETE_ASSIGNMENT_CONTAINER_FAILED,
  payload,
});

export const fetchAssignmentTransactionByIdRequest = (
  payload: string
): IFetchAssignmentTransactionByIdRequestAction => ({
  type: FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST,
  payload,
});

export const fetchAssignmentTransactionByIdSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchAssignmentTransactionByIdSuccessAction => ({
  type: FETCH_ASSIGNMENT_TRANSACTION_BY_ID_SUCCESS,
  payload,
});

export const fetchAssignmentTransactionByIdFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchAssignmentTransactionByIdFailureAction => ({
  type: FETCH_ASSIGNMENT_TRANSACTION_BY_ID_FAILED,
  payload,
});

export type AssignmentContainerAction =
  | IFetchAssignContainerRequestAction
  | IFetchAssignContainerSuccessAction
  | IFetchAssignContainerFailedAction
  | IFetchAssignContainerByIdRequestAction
  | IFetchAssignContainerByIdSucessAction
  | IFetchAssignContainerByIdFailedAction
  | IFetchAllTransactionRequestAction
  | IFetchAllTransactionSuccessAction
  | IFetchAllTransactionFailedAction
  | IFetchContainerTransactionRequestAction
  | IFetchContainerTransactionSuccessAction
  | IFetchContainerTransactionFailedAction
  | IFetchAssignedContainerCountRequestAction
  | IFetchAssignedContainerCountSuccessAction
  | IFetchAssignedContainerCountFailedAction
  | IFetchAllAlertLatestTransactionRequestAction
  | IFetchAllAlertLatestTransactionSuccessAction
  | IFetchAllAlertLatestTransactionFailedAction
  | IFetchAllCountTransactionRequestAction
  | IFetchAllCountTransactionSuccessAction
  | IFetchAllCountTransactionFailedAction
  | IDispatchAssignmentForConsumerRequest
  | IDispatchAssignmentForConsumerSuccess
  | IDispatchAssignmentForConsumerFailed
  | IFetchUserStockManagementRequestAction
  | IFetchUserStockManagementSuccessAction
  | IFetchUserStockManagementFailedAction
  | IDeleteAssignmentContainerRequestAction
  | IDeleteAssignmentContainerSuccessAction
  | IDeleteAssignmentContainerFailedAction
  | IFetchAssignmentTransactionByIdRequestAction
  | IFetchAssignmentTransactionByIdSuccessAction
  | IFetchAssignmentTransactionByIdFailureAction
  | IReceiveAssignmentForUserRequest
  | IReceiveAssignmentForUserSuccess
  | IReceiveAssignmentForUserFailed
  | IFetchAssignContainerForReceiveRequestAction
  | IFetchAssignContainerForReceiveSuccessAction
  | IFetchAssignContainerForReceiveFailedAction;
