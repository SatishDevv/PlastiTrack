import { IAxiosResponse } from "@/interface/generic.model";
import { all, call, put, takeLatest } from "redux-saga/effects";
import UserService from "@/service/user.service";
import {
  ADD_USER_REQUEST,
  addUserFailed,
  addUserSuccess,
  FETCH_BY_ID_USER_REQUEST,
  FETCH_USER_REQUEST,
  fetchUserFailed,
  fetchUserSuccess,
  IFecthUserByIdRequestAction,
  fetchByIdUserSuccess,
  fetchByIdUserFailed,
  IFilterFetchUserRequestAction,
  FILTER_FETCH_USER_REQUEST,
  FILTER_FETCH_CONSUMER_REQUEST,
  IDeleteUserRequestAction,
  deleteUserSuccess,
  deleteUserFailed,
  DELETE_USER_REQUEST,
} from "../action/user.action.action";

function* updateUser(action: any) {
  const data = action.payload._id;
  console.log(data);
  try {
    let response: IAxiosResponse<any>;

    if (data) {
      response = yield call(UserService.updateUser, action.payload);
    } else {
      response = yield call(UserService.addUser, action.payload);
    }

    yield put(
      addUserSuccess({ result: response?.data, error: [], pending: false })
    );
  } catch (error: any) {
    yield put(
      addUserFailed({
        error:
          typeof error?.response?.data === "string"
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      })
    );
  }
}

function* fetchUser() {
  try {
    const response: IAxiosResponse<any> = yield call(UserService.fetchUser);

    yield put(
      fetchUserSuccess({ result: response.data, error: [], pending: false })
    );
  } catch (error) {
    yield put(fetchUserFailed({ result: null, error: [], pending: false }));
  }
}

function* fetchUserById(action: IFecthUserByIdRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      UserService.fetchUserById,
      action.payload
    );

    yield put(
      fetchByIdUserSuccess({ result: response.data, error: [], pending: false })
    );
  } catch (error) {
    yield put(fetchByIdUserFailed({ result: null, error: [], pending: false }));
  }
}

function* fetchUserByRole(action: IFilterFetchUserRequestAction) {
  const data = action.payload

   try {

    const response: IAxiosResponse<any> = yield call(UserService.filterUserBaseOnRole,data );
 
     yield put(
       fetchUserSuccess({ result: response.data, error: [], pending: false })
     );
   } catch (error) {
     yield put(fetchUserFailed({ result: null, error: [], pending: false }));
   }
 }

 function* filterConsumerByRole(action: IFilterFetchUserRequestAction) {
  const data = action.payload

   try {

    const response: IAxiosResponse<any> = yield call(UserService.filterConsumer,data );
 
     yield put(
       fetchUserSuccess({ result: response.data, error: [], pending: false })
     );
   } catch (error) {
     yield put(fetchUserFailed({ result: null, error: [], pending: false }));
   }
 }

 function* deleteUserById(action: IDeleteUserRequestAction) {
  const id = action.payload
   try {
     yield put(
       deleteUserSuccess({
         result: id,
         error: [],
         pending: false,
       })
     );
   } catch (error: any) {
     yield put(
       deleteUserFailed({
         result: error?.response?.data,
         error: ["error"],
         pending: false,
       })
     );
   }
 }


export default function* userSaga() {
  yield all([
    takeLatest(ADD_USER_REQUEST, updateUser),
    takeLatest(FETCH_USER_REQUEST, fetchUser),
    takeLatest(FETCH_BY_ID_USER_REQUEST, fetchUserById),
    takeLatest(FILTER_FETCH_USER_REQUEST, fetchUserByRole),
    takeLatest(FILTER_FETCH_CONSUMER_REQUEST, filterConsumerByRole),
    takeLatest(DELETE_USER_REQUEST, deleteUserById),
  ]);
}
