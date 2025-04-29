//FETCH TRACK FLOW STATUS

import { IAssignContainerModel } from "@/interface/assign.container";
import { AppStore } from "@/interface/generic.model";

export const FETCH_ALLOT_CONTAINER_REQUEST = "FETCH_ALLOT_CONTAINER_REQUEST";
export const FETCH_ALLOT_CONTAINER_SUCCESS = "FETCH_ALLOT_CONTAINER_SUCCESS";
export const FETCH_ALLOT_CONTAINER_FAILED = "FETCH_ALLOT_CONTAINER_FAILED";

//ADD
export const ADD_ALLOT_CONTAINER_REQUEST = "ADD_ALLOT_CONTAINER_REQUEST";
export const ADD_ALLOT_CONTAINER_SUCCESS = "ADD_ALLOT_CONTAINER_SUCCESS";
export const ADD_ALLOT_CONTAINER_FAILED  =  "ADD_ALLOT_CONTAINER_FAILED";



  // FETCH ALL

export interface IFetchAllotContainerRequestAction {
  type: typeof FETCH_ALLOT_CONTAINER_REQUEST;
  payload: any;
}

export interface IFetchAllotContainerSuccessAction {
  type: typeof FETCH_ALLOT_CONTAINER_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IFetchAllotContainerFailedAction {
  type: typeof FETCH_ALLOT_CONTAINER_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}

//ADD

export interface IAddAllotContainerRequest {
  type: typeof ADD_ALLOT_CONTAINER_REQUEST;
  payload: any
}

export interface IAddAllotContainerSuccess {
  type: typeof ADD_ALLOT_CONTAINER_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IAddAllotContainerFailed {
  type: typeof ADD_ALLOT_CONTAINER_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}


//FETCH TRACK FLOW STATUS

export const fetchAllotContainerRequest = (
  payload: any
): IFetchAllotContainerRequestAction => ({
  type: FETCH_ALLOT_CONTAINER_REQUEST,
  payload,
});

export const fetchAllotContainerSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchAllotContainerSuccessAction => ({
  type: FETCH_ALLOT_CONTAINER_SUCCESS,
  payload,
});

export const fetchAllotContainerFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchAllotContainerFailedAction => ({
  type: FETCH_ALLOT_CONTAINER_FAILED,
  payload,
});

// ADD
export const addAllotContainerRequest = (
  payload: any
): IAddAllotContainerRequest => ({
  type: ADD_ALLOT_CONTAINER_REQUEST,
  payload,
});

export const addAllotContainerSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IAddAllotContainerSuccess => ({
  type: ADD_ALLOT_CONTAINER_SUCCESS,
  payload,
});

export const addAllotContainerFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IAddAllotContainerFailed => ({
  type: ADD_ALLOT_CONTAINER_FAILED,
  payload,
});


export type AllotAssignmentsActionTypes =
  | IFetchAllotContainerRequestAction
  | IFetchAllotContainerSuccessAction
  | IFetchAllotContainerFailedAction
  | IAddAllotContainerRequest
  | IAddAllotContainerSuccess
  | IAddAllotContainerFailed;
