import { AppStore } from "@/interface/generic.model";
import {
  IRoleModel,
  RoleModel,
} from "@/interface/role.model";

export const ADD_ROLE_REQUEST = "ADD_ROLE_REQUEST";
export const ADD_ROLE_SUCCESS = "ADD_ROLE_SUCCESS";
export const ADD_ROLE_FAILED = "ADD_ROLE_FAILED";

export const FETCH_ROLE_REQUEST = "FETCH_ROLE_REQUEST";
export const FETCH_ROLE_SUCCESS = "FETCH_ROLE_SUCCESS";
export const FETCH_ROLE_FAILED = "FETCH_ROLE_FAILED ";

export const FETCH_BY_ID_ROLE_REQUEST = "FETCH_BY_ID_ROLE_REQUEST";
export const FETCH_BY_ID_ROLE_SUCCESS = "FETCH_BY_ID_ROLE_SUCCESS";
export const FETCH_BY_ID_ROLE_FAILED = "FETCH_BY_ID_ROLE_FAILED ";

export const DELETE_ROLE_REQUEST = "DELETE_ROLE_REQUEST";
export const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_FAILED = "DELETE_ROLE_FAILED ";

export const RESET_DELETE_ROLE = "RESET_DELETE_ROLE";

export interface IAddRoleRequestAction {
  type: typeof ADD_ROLE_REQUEST;
  payload: IRoleModel;
}

export interface IAddRoleSuccessAction {
  type: typeof ADD_ROLE_SUCCESS;
  payload: AppStore<IRoleModel>;
}

export interface IAddRoleFailedAction {
  type: typeof ADD_ROLE_FAILED;
  payload: AppStore<IRoleModel>;
}
//FETCH BY ID
export interface IFetchByIdAddRoleRequestAction {
  type: typeof FETCH_BY_ID_ROLE_REQUEST;
  payload: string;
}

export interface IFetchByIdAddRoleSuccessAction {
  type: typeof FETCH_BY_ID_ROLE_SUCCESS;
  payload: AppStore<IRoleModel[]>;
}

export interface IFetchByIdAddRoleFailureAction {
  type: typeof FETCH_BY_ID_ROLE_FAILED;
  payload: AppStore<IRoleModel[]>;
}

//FETCH ALL
export interface IFetchRoleRequestAction {
  type: typeof FETCH_ROLE_REQUEST;
}

export interface IFetchRoleSuccessAction {
  type: typeof FETCH_ROLE_SUCCESS;
  payload: AppStore<RoleModel[]>;
}

export interface IFetchRoleFailedAction {
  type: typeof FETCH_ROLE_FAILED;
  payload: AppStore<RoleModel[]>;
}

//DELETE
export interface IDeleteRoleRequestAction {
  type: typeof DELETE_ROLE_REQUEST;
  payload: string;
}

export interface IDeleteRoleSuccessAction {
  type: typeof DELETE_ROLE_SUCCESS;
  payload: AppStore<String>;
}

export interface IDeleteRoleFailedAction {
  type: typeof DELETE_ROLE_FAILED;
  payload: AppStore<String>;
}

export interface IResetDeleteRole {
  type: typeof RESET_DELETE_ROLE;
}

// UPDATE
export const addRoleRequest = (payload: IRoleModel): IAddRoleRequestAction => ({
  type: ADD_ROLE_REQUEST,
  payload,
});

export const addRoleSuccess = (
  payload: AppStore<IRoleModel>
): IAddRoleSuccessAction => ({
  type: ADD_ROLE_SUCCESS,
  payload,
});

export const addRoleFailed = (
  payload: AppStore<IRoleModel>
): IAddRoleFailedAction => ({
  type: ADD_ROLE_FAILED,
  payload,
});

//FETCH ALL

export const fetchRoleRequest = (
): IFetchRoleRequestAction => ({
  type: FETCH_ROLE_REQUEST,
});

export const fetchRoleSuccess = (
  payload: AppStore<RoleModel[]>
): IFetchRoleSuccessAction => ({
  type: FETCH_ROLE_SUCCESS,
  payload,
});

export const fetchRoleFailed = (
  payload: AppStore<RoleModel[]>
): IFetchRoleFailedAction => ({
  type: FETCH_ROLE_FAILED,
  payload,
});

export const fetchByIdAddRoleRequest = (
  payload: string
): IFetchByIdAddRoleRequestAction => ({
  type: FETCH_BY_ID_ROLE_REQUEST,
  payload,
});

export const fetchByIdAddRoleSuccess = (
  payload: AppStore<IRoleModel[]>
): IFetchByIdAddRoleSuccessAction => ({
  type: FETCH_BY_ID_ROLE_SUCCESS,
  payload,
});

export const fetchByIdAddRoleFailed = (
  payload: AppStore<IRoleModel[]>
): IFetchByIdAddRoleFailureAction => ({
  type: FETCH_BY_ID_ROLE_FAILED,
  payload,
});

export const deleteRoleRequest = (
  payload: string
): IDeleteRoleRequestAction => ({
  type: DELETE_ROLE_REQUEST,
  payload,
});

export const deleteRoleSuccess = (
  payload: AppStore<String>
): IDeleteRoleSuccessAction => ({
  type: DELETE_ROLE_SUCCESS,
  payload,
});

export const deleteRoleFailed = (
  payload: AppStore<String>
): IDeleteRoleFailedAction => ({
  type: DELETE_ROLE_FAILED,
  payload,
});

export const resetDeleteRole = (): IResetDeleteRole => ({
  type: RESET_DELETE_ROLE,
});


export type RoleAction =
  | IAddRoleRequestAction
  | IAddRoleSuccessAction
  | IAddRoleFailedAction
  | IFetchRoleRequestAction
  | IFetchRoleSuccessAction
  | IFetchRoleFailedAction
  | IFetchByIdAddRoleRequestAction
  | IFetchByIdAddRoleSuccessAction
  | IFetchByIdAddRoleFailureAction
  | IDeleteRoleRequestAction
  | IDeleteRoleSuccessAction
  | IDeleteRoleFailedAction
  | IResetDeleteRole;
