import {
  ContainerModel,
  IContainerModel,
} from "@/interface/container";
import { AppStore } from "@/interface/generic.model";

export const FETCH_ALL_CONTAINER_REQUEST = "FETCH_ALL_CONTAINER_REQUEST";
export const FETCH_ALL_CONTAINER_SUCCESS = "FETCH_ALL_CONTAINER_SUCCESS";
export const FETCH_ALL_CONTAINER_FAILED = "FETCH_ALL_CONTAINER_FAILED";

export const ADD_CONTAINER_REQUEST = "ADD_CONTAINER_REQUEST";
export const ADD_CONTAINER_SUCCESS = "ADD_CONTAINER_SUCCESS";
export const ADD_CONTAINER_FAILED = "ADD_CONTAINER_FAILED";

export const FETCH_BY_ID_CONTAINER_REQUEST = "FETCH_CONTAINER_REQUEST";
export const FETCH_BY_ID_CONTAINER_SUCCESS = "FETCH_CONTAINER_SUCCESS";
export const FETCH_BY_ID_CONTAINER_FAILED = "FETCH_CONTAINER_FAILED";

export const DELETE_CONTAINER_REQUEST = "DELETE_CONTAINER_REQUEST";
export const DELETE_CONTAINER_SUCCESS = "DELETE_CONTAINER_SUCCESS";
export const DELETE_CONTAINER_FAILED = "DELETE_CONTAINER_FAILED";

export const FETCH_CONSUMER_TREND_REQUEST = "FETCH_CONSUMER_TREND_REQUEST";
export const FETCH_CONSUMER_TREND_SUCCESS = "FETCH_CONSUMER_TREND_SUCCESS";
export const FETCH_CONSUMER_TREND_FAILED = "FETCH_CONSUMER_TREND_FAILED";

export const FETCH_VENDOR_TREND_REQUEST = "FETCH_VENDOR_TREND_REQUEST";
export const FETCH_VENDOR_TREND_SUCCESS = "FETCH_VENDOR_TREND_SUCCESS";
export const FETCH_VENDOR_TREND_FAILED = "FETCH_VENDOR_TREND_FAILED";

export const FETCH_CUSTOMER_TREND_REQUEST = "FETCH_CUSTOMER_TREND_REQUEST";
export const FETCH_CUSTOMER_TREND_SUCCESS = "FETCH_CUSTOMER_TREND_SUCCESS";
export const FETCH_CUSTOMER_TREND_FAILED = "FETCH_CUSTOMER_TREND_FAILED";

export const FETCH_CONTAINER_COUNT_REQUEST = "FETCH_CONTAINER_COUNT_REQUEST";
export const FETCH_CONTAINER_COUNT_SUCCESS = "FETCH_CONTAINER_COUNT_SUCCESS";
export const FETCH_CONTAINER_COUNT_FAILED = "FETCH_CONTAINER_COUNT_FAILED";

export const FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST =
  "FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST";
export const FETCH_CONTAINER_COUNT_FOR_ALLOT_SUCCESS =
  "FETCH_CONTAINER_COUNT_FOR_ALLOT_SUCCESS";
export const FETCH_CONTAINER_COUNT_FOR_ALLOT_FAILED =
  "FETCH_CONTAINER_COUNT_FOR_ALLOT_FAILED";

//ADD ALL
export interface IAddContainerRequestAction {
  type: typeof ADD_CONTAINER_REQUEST;
  payload: IContainerModel;
}

export interface IAddContainerSuccessAction {
  type: typeof ADD_CONTAINER_SUCCESS;
  payload: AppStore<IContainerModel>;
}

export interface IAddContainerFailureAction {
  type: typeof ADD_CONTAINER_FAILED;
  payload: AppStore<IContainerModel>;
}

//FETCH BY ID
export interface IFetchByIdAddContainerRequestAction {
  type: typeof FETCH_BY_ID_CONTAINER_REQUEST;
  payload: string;
}

export interface IFetchByIdAddContainerSuccessAction {
  type: typeof FETCH_BY_ID_CONTAINER_SUCCESS;
  payload: AppStore<IContainerModel[]>;
}

export interface IFetchByIdAddContainerFailureAction {
  type: typeof FETCH_BY_ID_CONTAINER_FAILED;
  payload: AppStore<IContainerModel[]>;
}

//DELETE BY ID
export interface IDeleteContainerRequestAction {
  type: typeof DELETE_CONTAINER_REQUEST;
  payload: string;
}

export interface IDeleteContainerSuccessAction {
  type: typeof DELETE_CONTAINER_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteContainerFailureAction {
  type: typeof DELETE_CONTAINER_FAILED;
  payload: AppStore<string>;
}
//FETCH ALL
//#region - Action interfaces
export interface IContainerRequestAction {
  type: typeof FETCH_ALL_CONTAINER_REQUEST;
}

export interface IContainerSuccessAction {
  type: typeof FETCH_ALL_CONTAINER_SUCCESS;
  payload: AppStore<ContainerModel[]>;
}

export interface IContainerFailureAction {
  type: typeof FETCH_ALL_CONTAINER_FAILED;
  payload: AppStore<ContainerModel[]>;
}

//FETCH ALL
//#region - Action interfaces
export interface IFetchConsumerTrendRequestAction {
  type: typeof FETCH_CONSUMER_TREND_REQUEST;
}

export interface IFetchConsumerTrendSuccessAction {
  type: typeof FETCH_CONSUMER_TREND_SUCCESS;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchConsumerTrendFailureAction {
  type: typeof FETCH_CONSUMER_TREND_FAILED;
  payload: AppStore<ContainerModel[]>;
}

//FETCH ALL
//#region - Action interfaces
export interface IFetchVendorTrendRequestAction {
  type: typeof FETCH_VENDOR_TREND_REQUEST;
}

export interface IFetchVendorTrendSuccessAction {
  type: typeof FETCH_VENDOR_TREND_SUCCESS;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchVendorTrendFailureAction {
  type: typeof FETCH_VENDOR_TREND_FAILED;
  payload: AppStore<ContainerModel[]>;
}

//FETCH ALL
//#region - Action interfaces
export interface IFetchCustomerTrendRequestAction {
  type: typeof FETCH_CUSTOMER_TREND_REQUEST;
}

export interface IFetchCustomerTrendSuccessAction {
  type: typeof FETCH_CUSTOMER_TREND_SUCCESS;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchCustomerTrendFailureAction {
  type: typeof FETCH_CUSTOMER_TREND_FAILED;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchContainerCountRequestAction {
  type: typeof FETCH_CONTAINER_COUNT_REQUEST;
  // payload: {containerId: string};
  payload: any;
}

export interface IFetchContainerCountSuccessAction {
  type: typeof FETCH_CONTAINER_COUNT_SUCCESS;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchContainerCountFailureAction {
  type: typeof FETCH_CONTAINER_COUNT_FAILED;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchContainerCountForAllocateRequestAction {
  type: typeof FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST;
  // payload: {transactionId: string, userId: string};
  payload: any;
}

export interface IFetchContainerCountForAllocateSuccessAction {
  type: typeof FETCH_CONTAINER_COUNT_FOR_ALLOT_SUCCESS;
  payload: AppStore<ContainerModel[]>;
}

export interface IFetchContainerCountForAllocateFailureAction {
  type: typeof FETCH_CONTAINER_COUNT_FOR_ALLOT_FAILED;
  payload: AppStore<ContainerModel[]>;
}

//UPDATE
export const addContainerRequest = (
  payload: IContainerModel
): IAddContainerRequestAction => ({
  type: ADD_CONTAINER_REQUEST,
  payload,
});

export const addContainerSuccess = (
  payload: AppStore<IContainerModel>
): IAddContainerSuccessAction => ({
  type: ADD_CONTAINER_SUCCESS,
  payload,
});

export const addContainerFailed = (
  payload: AppStore<IContainerModel>
): IAddContainerFailureAction => ({
  type: ADD_CONTAINER_FAILED,
  payload,
});

//

//#region - Action functions
export const fetchContainerRequest = (
): IContainerRequestAction => ({
  type: FETCH_ALL_CONTAINER_REQUEST,
});

export const fetchContainerSuccess = (
  payload: AppStore<ContainerModel[]>
): IContainerSuccessAction => ({
  type: FETCH_ALL_CONTAINER_SUCCESS,
  payload,
});

export const fetchContainerFailed = (
  payload: AppStore<ContainerModel[]>
): IContainerFailureAction => ({
  type: FETCH_ALL_CONTAINER_FAILED,
  payload,
});

export const fetchbyidaddContainerRequest = (
  payload: string
): IFetchByIdAddContainerRequestAction => ({
  type: FETCH_BY_ID_CONTAINER_REQUEST,
  payload,
});

export const fetchbyidaddConatinerSuccess = (
  payload: AppStore<IContainerModel[]>
): IFetchByIdAddContainerSuccessAction => ({
  type: FETCH_BY_ID_CONTAINER_SUCCESS,
  payload,
});

export const fetchbyidaddConatinerFailed = (
  payload: AppStore<IContainerModel[]>
): IFetchByIdAddContainerFailureAction => ({
  type: FETCH_BY_ID_CONTAINER_FAILED,
  payload,
});

export const deleteContainerRequest = (
  payload: string
): IDeleteContainerRequestAction => ({
  type: DELETE_CONTAINER_REQUEST,
  payload,
});

export const deleteConatinerSuccess = (
  payload: AppStore<string>
): IDeleteContainerSuccessAction => ({
  type: DELETE_CONTAINER_SUCCESS,
  payload,
});
export const deleteConatinerSFailure = (
  payload: AppStore<string>
): IDeleteContainerFailureAction => ({
  type: DELETE_CONTAINER_FAILED,
  payload,
});

//#region - Action functions
export const fetchConsumerTrendRequest = (
): IFetchConsumerTrendRequestAction => ({
  type: FETCH_CONSUMER_TREND_REQUEST,
});

export const fetchConsumerTrendSuccess = (
  payload: AppStore<ContainerModel[]>
): IFetchConsumerTrendSuccessAction => ({
  type: FETCH_CONSUMER_TREND_SUCCESS,
  payload,
});

export const fetchConsumerTrendFailed = (
  payload: AppStore<ContainerModel[]>
): IFetchConsumerTrendFailureAction => ({
  type: FETCH_CONSUMER_TREND_FAILED,
  payload,
});

//#region - Action functions
export const fetchVendorTrendRequest = (): IFetchVendorTrendRequestAction => ({
  type: FETCH_VENDOR_TREND_REQUEST,
});

export const fetchVendorTrendSuccess = (
  payload: AppStore<ContainerModel[]>
): IFetchVendorTrendSuccessAction => ({
  type: FETCH_VENDOR_TREND_SUCCESS,
  payload,
});

export const fetchVendorTrendFailed = (
  payload: AppStore<ContainerModel[]>
): IFetchVendorTrendFailureAction => ({
  type: FETCH_VENDOR_TREND_FAILED,
  payload,
});

//#region - Action functions
export const fetchCustomerTrendRequest = (
): IFetchCustomerTrendRequestAction => ({
  type: FETCH_CUSTOMER_TREND_REQUEST,
});

export const fetchCustomerTrendSuccess = (
  payload: AppStore<ContainerModel[]>
): IFetchCustomerTrendSuccessAction => ({
  type: FETCH_CUSTOMER_TREND_SUCCESS,
  payload,
});

export const fetchCustomerTrendFailed = (
  payload: AppStore<ContainerModel[]>
): IFetchCustomerTrendFailureAction => ({
  type: FETCH_CUSTOMER_TREND_FAILED,
  payload,
});

//#region - Action functions
export const fetchContainerCountRequest = (
  // payload: {containerId: string}
  payload: any
): IFetchContainerCountRequestAction => ({
  type: FETCH_CONTAINER_COUNT_REQUEST,
  payload,
});

export const fetchContainerCountSuccess = (
  payload: AppStore<ContainerModel[]>
): IFetchContainerCountSuccessAction => ({
  type: FETCH_CONTAINER_COUNT_SUCCESS,
  payload,
});

export const fetchContainerCountFailed = (
  payload: AppStore<ContainerModel[]>
): IFetchContainerCountFailureAction => ({
  type: FETCH_CONTAINER_COUNT_FAILED,
  payload,
});

//#region - Action functions
export const fetchContainerCountForAllocateRequest = (
  // payload: {transactionId: string, userId: string}
  payload: any
): IFetchContainerCountForAllocateRequestAction => ({
  type: FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST,
  payload,
});

export const fetchContainerCountForAllocateSuccess = (
  payload: AppStore<ContainerModel[]>
): IFetchContainerCountForAllocateSuccessAction => ({
  type: FETCH_CONTAINER_COUNT_FOR_ALLOT_SUCCESS,
  payload,
});

export const fetchContainerCountForAllocateFailed = (
  payload: AppStore<ContainerModel[]>
): IFetchContainerCountForAllocateFailureAction => ({
  type: FETCH_CONTAINER_COUNT_FOR_ALLOT_FAILED,
  payload,
});

export type ContainerActions =
  | IContainerRequestAction
  | IContainerSuccessAction
  | IContainerFailureAction
  | IAddContainerRequestAction
  | IAddContainerSuccessAction
  | IAddContainerFailureAction
  | IFetchByIdAddContainerRequestAction
  | IFetchByIdAddContainerSuccessAction
  | IFetchByIdAddContainerFailureAction
  | IDeleteContainerRequestAction
  | IDeleteContainerSuccessAction
  | IDeleteContainerFailureAction
  | IFetchConsumerTrendRequestAction
  | IFetchConsumerTrendSuccessAction
  | IFetchConsumerTrendFailureAction
  | IFetchVendorTrendRequestAction
  | IFetchVendorTrendSuccessAction
  | IFetchVendorTrendFailureAction
  | IFetchCustomerTrendRequestAction
  | IFetchCustomerTrendSuccessAction
  | IFetchCustomerTrendFailureAction
  | IFetchContainerCountRequestAction
  | IFetchContainerCountSuccessAction
  | IFetchContainerCountFailureAction
  | IFetchContainerCountForAllocateRequestAction
  | IFetchContainerCountForAllocateSuccessAction
  | IFetchContainerCountForAllocateFailureAction;
