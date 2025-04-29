import { IAxiosResponse } from "@/interface/generic.model";
import {
  FETCH_ALL_TRANSACTION_REQUEST,
  FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST,
  FETCH_ASSIGNMENT_CONTAINER_REQUEST,
  FETCH_CONTAINER_TRANSACTIONS_REQUEST,
  fetchAssignContainerByIdFailed,
  fetchAssignContainerByIdSuccess,
  fetchAssignContainerFailed,
  fetchAssignContainerSuccess,
  fetchAssignedContainerCountFailed,
  fetchAssignedContainerCountSuccess,
  fetchContainerTransactionFailed,
  fetchContainerTransactionSuccess,
  IFetchAssignContainerByIdRequestAction,
  IFetchAssignContainerRequestAction,
  IFetchAllTransactionRequestAction,
  IFetchAssignedContainerCountRequestAction,
  FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST,
  fetchAllAlertLatestTransactionSuccess,
  fetchAllAlertLatestTransactionFailed,
  ALERT_LATEST_TRANSACTION_REQUEST,
  fetchAllCountTransactionSuccess,
  fetchAllCountTransactionFailed,
  FETCH_ALL_COUNT_TRANSACTION_REQUEST,
  dispatchAssignmentForConsumerSuccess,
  dispatchAssignmentForConsumerFailed,
  DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST,
  fetchUserStockManagementSuccess,
  fetchUserStockManagementFailed,
  FETCH_USER_STOCK_MANAGEMENT_REQUEST,
  IDeleteAssignmentContainerRequestAction,
  deleteAssignmentTransactionSuccess,
  deleteAssignmentTransactionFailed,
  DELETE_ASSIGNMENT_CONTAINER_REQUEST,
  IFetchAssignmentTransactionByIdRequestAction,
  fetchAssignmentTransactionByIdSuccess,
  fetchAssignmentTransactionByIdFailed,
  FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST,
  receiveAssignmentForUserSuccess,
  receiveAssignmentForUserFailed,
  RECEIVE_ASSIGNMENT_FOR_USER_REQUEST,
  FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST,
  fetchAssignContainerForReceiveSuccess,
  fetchAssignContainerForReceiveFailed,
  IFetchAssignContainerForReceiveRequestAction,
} from "../action/assign.container.action";
import { all, call, put, takeLatest } from "redux-saga/effects";
import AssignmentContainerService from "@/service/assignmentContainer.service";



function* fetchAssignContainer(action: IFetchAssignContainerRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAssignContainer, action.payload
    );

    yield put(
      fetchAssignContainerSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAssignContainerFailed({ result: null, error: [], pending: false })
    );
  }
}

function* fetchAssignContainerForUser(action: IFetchAssignContainerForReceiveRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAssignContainerForUser, action.payload
    );

    yield put(
      fetchAssignContainerForReceiveSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAssignContainerForReceiveFailed({ result: null, error: [], pending: false })
    );
  }
}

function* fetchAssignContainerById(
  action: IFetchAssignContainerByIdRequestAction
) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAssignContainerById,
      action.payload
    );

    yield put(
      fetchAssignContainerByIdSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAssignContainerByIdFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}

//fetch assign conatiner using transactionId
function* fetchAllTransaction(action: IFetchAllTransactionRequestAction) {

  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAssignedContainerToCustomerForAdmin,
      action.payload
    );

    yield put(
      fetchAssignedContainerCountSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAssignedContainerCountFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}

function* fetchContainerTransaction() {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchContainerTransaction
    );

    yield put(
      fetchContainerTransactionSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchContainerTransactionFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}

//fetch assign conatiner using transactionId
function* fetchAssignedContainerCount(
  action: IFetchAssignedContainerCountRequestAction
) {

  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAssignedContainerCount,
      action.payload
    );

    yield put(
      fetchAssignedContainerCountSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAssignedContainerCountFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}




function* fetchAllAlertLatestTransaction() {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAllAlertLatestTransaction
    );

    yield put(
      fetchAllAlertLatestTransactionSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAllAlertLatestTransactionFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}

function* fetchAllCountTransaction() {
  console.log("call graph");
  
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAllCountTransaction
    );
    console.log(response.data);
    

    yield put(
      fetchAllCountTransactionSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAllCountTransactionFailed({ result: null, error: [], pending: false })
    );
  }
}

function* dispatchForConsumer(action: any) {
  const data = action.payload;
  console.log(data);
  try {
    let response: IAxiosResponse<any>;

    if (action.payload?.id) {
      response = yield call(
        AssignmentContainerService.updateAssignmentContainer,
        action.payload
      );
    } else {
      response = yield call(
        AssignmentContainerService.dispatchAssignmentForConsumer,
        action.payload
      );
    }

    yield put(
      dispatchAssignmentForConsumerSuccess({
        result: response?.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      dispatchAssignmentForConsumerFailed({
        result: error?.response?.data,
        error: error?.response?.data,
        pending: false,
      })
    );
  }
}

function* receiveForUser(action: any) {
  try {
    let response: IAxiosResponse<any>;

    if (action.payload?.id) {
      response = yield call(
        AssignmentContainerService.updateAssignmentContainer,
        action.payload
      );
    } else {
      response = yield call(
        AssignmentContainerService.receiveAssignmentForConsumer,
        action.payload
      );
    }

    yield put(
      receiveAssignmentForUserSuccess({
        result: response?.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      receiveAssignmentForUserFailed({
        result: error?.response?.data,
        error: error?.response?.data,
        pending: false,
      })
    );
  }
}

function* fetchUserStockManagement() {  
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchUserStock
    );
    console.log(response.data);
    

    yield put(
      fetchUserStockManagementSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchUserStockManagementFailed({ result: null, error: [], pending: false })
    );
  }
}

function* deleteAssignmentTransactionById(action: IDeleteAssignmentContainerRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.deleteTransactionAssignmentById,
      action.payload
    );
    yield put(
      deleteAssignmentTransactionSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      deleteAssignmentTransactionFailed({
        result: error?.response?.data,
        error: [],
        pending: false,
      })
    );
  }
}

function* fetchAssignmentTransactionById(action: IFetchAssignmentTransactionByIdRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AssignmentContainerService.fetchAssignmentTransactionById,
      action.payload
    );
    yield put(
      fetchAssignmentTransactionByIdSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAssignmentTransactionByIdFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}

export default function* AssignmentContainerSaga() {
  yield all([
    takeLatest(FETCH_ASSIGNMENT_CONTAINER_REQUEST, fetchAssignContainer),
    takeLatest(
      FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST,
      fetchAssignContainerById
    ),
    takeLatest(FETCH_ALL_TRANSACTION_REQUEST, fetchAllTransaction),
    takeLatest(FETCH_CONTAINER_TRANSACTIONS_REQUEST, fetchContainerTransaction),
    takeLatest(
      FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST,
      fetchAssignedContainerCount
    ),
    takeLatest(ALERT_LATEST_TRANSACTION_REQUEST, fetchAllAlertLatestTransaction),
    takeLatest(
      FETCH_ALL_COUNT_TRANSACTION_REQUEST,
      fetchAllCountTransaction
    ),
    takeLatest(DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST, dispatchForConsumer),
    takeLatest(RECEIVE_ASSIGNMENT_FOR_USER_REQUEST, receiveForUser),
    takeLatest(FETCH_USER_STOCK_MANAGEMENT_REQUEST, fetchUserStockManagement),
    takeLatest(DELETE_ASSIGNMENT_CONTAINER_REQUEST, deleteAssignmentTransactionById),
    takeLatest(FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST, fetchAssignmentTransactionById),
    takeLatest(FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST, fetchAssignContainerForUser),
  ]);
}
