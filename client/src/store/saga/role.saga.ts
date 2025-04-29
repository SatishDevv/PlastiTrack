import { IAxiosResponse } from "@/interface/generic.model";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_ROLE_REQUEST,
  addRoleFailed,
  addRoleSuccess,
  DELETE_ROLE_REQUEST,
  deleteRoleFailed,
  deleteRoleSuccess,
  FETCH_BY_ID_ROLE_REQUEST,
  FETCH_ROLE_REQUEST,
  fetchByIdAddRoleFailed,
  fetchByIdAddRoleSuccess,
  fetchRoleFailed,
  fetchRoleSuccess,
  IAddRoleRequestAction,
  IFetchByIdAddRoleRequestAction,
} from "../action/role.action";
import RoleService from "@/service/role.service";
import { IDeleteContainerRequestAction } from "../action/container.action";

function* updateRole(action: IAddRoleRequestAction) {
  try {
    let response: IAxiosResponse<any>;

    if (action?.payload?._id) {
      response = yield call(RoleService.updateRole, action.payload);
    } else {
      response = yield call(RoleService.addRole, action.payload);
    }

    yield put(
      addRoleSuccess({ result: response?.data, error: [], pending: false })
    );
  } catch (error: any) {
    yield put(
      addRoleFailed({
        error:
          typeof error?.response?.data === "string"
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      })
    );
  }
}

function* fetchRole() {
  try {
    const response: IAxiosResponse<any> = yield call(RoleService.fetchRole);

    yield put(
      fetchRoleSuccess({ result: response.data, error: [], pending: false })
    );
  } catch (error) {
    yield put(fetchRoleFailed({ result: null, error: [], pending: false }));
  }
}

function* fetchRoleById(action: IFetchByIdAddRoleRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      RoleService.fetchRoleById,
      action.payload
    );
    yield put(
      fetchByIdAddRoleSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchByIdAddRoleFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}

function* delRoleById(action: IDeleteContainerRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      RoleService.deleteRoleById,
      action.payload
    );
    yield put(
      deleteRoleSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      deleteRoleFailed({
        result: error?.response?.data,
        error: [],
        pending: false,
      })
    );
  }
}
export default function* roleSaga() {
  yield all([
    takeLatest(ADD_ROLE_REQUEST, updateRole),
    takeLatest(FETCH_ROLE_REQUEST, fetchRole),
    takeLatest(FETCH_BY_ID_ROLE_REQUEST, fetchRoleById),
    takeLatest(DELETE_ROLE_REQUEST, delRoleById),
  ]);
}
