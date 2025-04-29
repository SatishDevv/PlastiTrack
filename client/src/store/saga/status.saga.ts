import { IAxiosResponse } from "@/interface/generic.model";
import StatusService from "@/service/status.service";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_STATUS_REQUEST,
  addStatusFailed,
  addStatusSuccess,
  FETCH_BY_ID_STATUS_REQUEST,
  fetchbyidaddStatusFailed,
  fetchbyidaddStatusSuccess,
  FETCH_STATUS_REQUEST,
  fetchStatusFailed,
  fetchStatusSuccess,
  IAddStatusRequestAction,
  IFetchByIdAddStatusRequestAction,
  IDeleteStatusRequestAction,
  deleteStatusSuccess,
  deleteStatusFailed,
  DELETE_STATUS_REQUEST,
} from "../action/status.action";

function* updateStatus(action: IAddStatusRequestAction) {
  const data = action?.payload._id;
  console.log(data);

  try {
    let response: IAxiosResponse<any>;
    if (data) {
      console.log("call id");

      response = yield call(StatusService.updateStatus, action.payload);
    } else {
      console.log("cal add");

      response = yield call(StatusService.addStatus, action.payload);
    }
    yield put(
      addStatusSuccess({ result: response?.data, error: [], pending: false })
    );
  } catch (error: any) {
    yield put(
      addStatusFailed({
        error:
          typeof error?.response?.data === "string"
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      })
    );
  }
}

function* fetchStatus() {
  try {
    const response: IAxiosResponse<any> = yield call(StatusService.fetchStatus);

    yield put(
      fetchStatusSuccess({ result: response.data, error: [], pending: false })
    );
  } catch (error) {
    yield put(fetchStatusFailed({ result: null, error: [], pending: false }));
  }
}

function* fetchStatusById(action: IFetchByIdAddStatusRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      StatusService.fetchStatusById,
      action.payload
    );

    yield put(
      fetchbyidaddStatusSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchbyidaddStatusFailed({ result: null, error: [], pending: false })
    );
  }
}

function* deleteSTatusById(action: IDeleteStatusRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      StatusService.deleteStatusById,
      action.payload
    );
    yield put(
      deleteStatusSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      deleteStatusFailed({
        result: error?.response?.data,
        error: [],
        pending: false,
      })
    );
  }
}

export default function* statusSaga() {
  yield all([takeLatest(ADD_STATUS_REQUEST, updateStatus)]);
  yield all([takeLatest(FETCH_STATUS_REQUEST, fetchStatus)]);
  yield all([takeLatest(FETCH_BY_ID_STATUS_REQUEST, fetchStatusById)]);
  yield all([takeLatest(DELETE_STATUS_REQUEST, deleteSTatusById)]);
}
