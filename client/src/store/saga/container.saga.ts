import { IAxiosResponse } from "@/interface/generic.model";
import { all, call, put, takeLatest } from "redux-saga/effects";

import ContainerService from "@/service/container.service";
import {
  ADD_CONTAINER_REQUEST,
  DELETE_CONTAINER_REQUEST,
  addContainerFailed,
  addContainerSuccess,
  FETCH_ALL_CONTAINER_REQUEST,
  FETCH_BY_ID_CONTAINER_REQUEST,
  fetchbyidaddConatinerFailed,
  fetchbyidaddConatinerSuccess,
  fetchContainerFailed,
  fetchContainerSuccess,
  IFetchByIdAddContainerRequestAction,
  deleteConatinerSFailure,
  IDeleteContainerRequestAction,
  deleteConatinerSuccess,
  fetchConsumerTrendSuccess,
  fetchConsumerTrendFailed,
  FETCH_CONSUMER_TREND_REQUEST,
  fetchVendorTrendSuccess,
  fetchVendorTrendFailed,
  FETCH_VENDOR_TREND_REQUEST,
  fetchCustomerTrendSuccess,
  fetchCustomerTrendFailed,
  FETCH_CUSTOMER_TREND_REQUEST,
  fetchContainerCountSuccess,
  fetchContainerCountFailed,
  FETCH_CONTAINER_COUNT_REQUEST,
  IFetchContainerCountRequestAction,
  IFetchContainerCountForAllocateRequestAction,
  fetchContainerCountForAllocateSuccess,
  fetchContainerCountForAllocateFailed,
  FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST,
} from "../action/container.action";

function* updateContainer(action: any) {
  const data = action.payload._id;
  
  try {
    let response: IAxiosResponse<any>;
    if (data) {
      response = yield call(ContainerService.updateContainer, action.payload);
    } else {
      response = yield call(ContainerService.addContainer, action.payload);
    }
    yield put(
      addContainerSuccess({ result: response?.data, error: [], pending: false })
    );
  } catch (error: any) {
    yield put(
      addContainerFailed({
        error:
          typeof error?.response?.data == "string"
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      })
    );
  }
}

function* fetchContainer() {
  try {
    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchContainer
    );

    yield put(
      fetchContainerSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchContainerFailed({ result: null, error: ["error"], pending: false })
    );
  }
}

function* fetchContainerById(action: IFetchByIdAddContainerRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchContainerById,
      action.payload
    );
    yield put(
      fetchbyidaddConatinerSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchbyidaddConatinerFailed({ result: null, error: [], pending: false })
    );
  }
}

function* delContainerById(action: IDeleteContainerRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      ContainerService.deleteContainerById,
      action.payload
    );
    yield put(
      deleteConatinerSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      deleteConatinerSFailure({
        result: error?.response?.data,
        error: [],
        pending: false,
      })
    );
  }
}

function* fetchConsumerTrend() {
  try {
    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchConsumerTrend
    );

    yield put(
      fetchConsumerTrendSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchConsumerTrendFailed({ result: null, error: [], pending: false })
    );
  }
}

function* fetchVendorTrend() {
  try {
    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchVendorTrend
    );

    yield put(
      fetchVendorTrendSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchVendorTrendFailed({ result: null, error: [], pending: false })
    );
  }
}

function* fetchCustomerTrend() {
  try {
    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchCustomerTrend
    );

    yield put(
      fetchCustomerTrendSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchCustomerTrendFailed({ result: null, error: [], pending: false })
    );
  }
}

function* fetchContainerCount(action: IFetchContainerCountRequestAction) {

  try {
  const { containerId } = action.payload;
  console.log(containerId);
  

    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchContainerCount,  containerId);

    yield put(
      fetchContainerCountSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchContainerCountFailed({ result: null, error: [], pending: false })
    );
  }
}

function* fetchContainerCountForAllocate(action: IFetchContainerCountForAllocateRequestAction) {

  try {
  const { transactionId, userId } = action.payload;
  

    const response: IAxiosResponse<any> = yield call(
      ContainerService.fetchContainerCountForAllocate,  transactionId,
      userId
    );

    console.log(response.data);
    

    yield put(
      fetchContainerCountForAllocateSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchContainerCountForAllocateFailed({ result: null, error: [], pending: false })
    );
  }
}

export default function* containerSaga() {
  yield all([takeLatest(ADD_CONTAINER_REQUEST, updateContainer)]);
  yield all([takeLatest(FETCH_ALL_CONTAINER_REQUEST, fetchContainer)]);
  yield all([takeLatest(DELETE_CONTAINER_REQUEST, delContainerById)]);
  yield all([takeLatest(FETCH_BY_ID_CONTAINER_REQUEST, fetchContainerById)]);
  yield all([takeLatest(FETCH_CONSUMER_TREND_REQUEST, fetchConsumerTrend)]);
  yield all([takeLatest(FETCH_VENDOR_TREND_REQUEST, fetchVendorTrend)]);
  yield all([takeLatest(FETCH_CUSTOMER_TREND_REQUEST, fetchCustomerTrend)]);
  yield all([takeLatest(FETCH_CONTAINER_COUNT_REQUEST, fetchContainerCount)]);
  yield all([takeLatest(FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST, fetchContainerCountForAllocate)]);
}
