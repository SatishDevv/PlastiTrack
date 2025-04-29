import { IAxiosResponse } from "@/interface/generic.model";
import {
  ADD_TRANSACTION_MASTER_REQUEST,
  addTransactionMasterFailed,
  addTransactionMasterSuccess,
  DELETE_TRANSACTION_MASTER_REQUEST,
  deleteTransactionMasterFailed,
  deleteTransactionMasterSuccess,
  FETCH_ALL_TRANSACTION_MASTER_REQUEST,
  FETCH_TRANSACTION_MASTER_BY_ID_REQUEST,
  fetchTransactionMasterBYIdFailed,
  fetchTransactionMasterBYIdSuccess,
  fetchTransactionMasterFailed,
  fetchTransactionMasterSuccess,
  IAddTransactionMasterRequestAction,
  IDeleteTransactionMasterRequestAction,
  IFetchTransactionMasterBYIdRequestAction,
} from "../action/transaction.master.action";
import { all, call, put, takeLatest } from "redux-saga/effects";
import TransactionMasterService from "@/service/transaction.master.service";

function* updateTransactionMaster(action: IAddTransactionMasterRequestAction) {
  const data = action?.payload._id;
  console.log(data);

  try {
    let response: IAxiosResponse<any>;
    if (data) {
      console.log("call id");

      response = yield call(
        TransactionMasterService.updateTransaction,
        action.payload
      );
    } else {
      console.log("cal add");

      response = yield call(
        TransactionMasterService.addTransaction,
        action.payload
      );
    }
    yield put(
      addTransactionMasterSuccess({
        result: response?.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      addTransactionMasterFailed({
        error:
          typeof error?.response?.data === "string"
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      })
    );
  }
}

function* fetchContainerTransaction() {
  try {
    const response: IAxiosResponse<any> = yield call(
      TransactionMasterService.fetchContainerTransaction
    );

    yield put(
      fetchTransactionMasterSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchTransactionMasterFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}


function* deleteTransactionMasterById(action: IDeleteTransactionMasterRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
       TransactionMasterService.deleteTransactionMasterById,
      action.payload
    );
    yield put(
      deleteTransactionMasterSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      deleteTransactionMasterFailed({
        result: error?.response?.data,
        error: [],
        pending: false,
      })
    );
  }
}

function* fetchTransactionMasterById(action: IFetchTransactionMasterBYIdRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
       TransactionMasterService.fetchTransactionMasterById,
      action.payload
    );
    yield put(
      fetchTransactionMasterBYIdSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchTransactionMasterBYIdFailed({
        result: null,
        error: [],
        pending: false,
      })
    );
  }
}


export default function* transactionMasterSaga() {
  yield all([
    takeLatest(ADD_TRANSACTION_MASTER_REQUEST, updateTransactionMaster),
    takeLatest(FETCH_ALL_TRANSACTION_MASTER_REQUEST, fetchContainerTransaction),
    takeLatest(DELETE_TRANSACTION_MASTER_REQUEST, deleteTransactionMasterById),
    takeLatest(FETCH_TRANSACTION_MASTER_BY_ID_REQUEST, fetchTransactionMasterById)
  ]);
}
  