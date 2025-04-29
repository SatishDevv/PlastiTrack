import { TransactionAppStore } from "@/interface/transaction";
import {
  ADD_TRANSACTION_MASTER_FAILED,
  ADD_TRANSACTION_MASTER_REQUEST,
  ADD_TRANSACTION_MASTER_SUCCESS,
  DELETE_TRANSACTION_MASTER_FAILED,
  DELETE_TRANSACTION_MASTER_REQUEST,
  DELETE_TRANSACTION_MASTER_SUCCESS,
  FETCH_ALL_TRANSACTION_MASTER_FAILED,
  FETCH_ALL_TRANSACTION_MASTER_REQUEST,
  FETCH_ALL_TRANSACTION_MASTER_SUCCESS,
  FETCH_TRANSACTION_MASTER_BY_ID_FAILED,
  FETCH_TRANSACTION_MASTER_BY_ID_REQUEST,
  FETCH_TRANSACTION_MASTER_BY_ID_SUCCESS,
  TransactionMasterActionTypes,
} from "../action/transaction.master.action";

const initialState: TransactionAppStore = new TransactionAppStore();

const TransactionMasterReducer = (
  state = initialState,
  action: TransactionMasterActionTypes
) => {
  switch (action.type) {
    case ADD_TRANSACTION_MASTER_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case ADD_TRANSACTION_MASTER_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case ADD_TRANSACTION_MASTER_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ALL_TRANSACTION_MASTER_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ALL_TRANSACTION_MASTER_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ALL_TRANSACTION_MASTER_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    //DELETE
    case DELETE_TRANSACTION_MASTER_REQUEST:
      return {
        ...state,
        delete: {
          pending: true,
        },
      };
    case DELETE_TRANSACTION_MASTER_SUCCESS:
      return {
        ...state,
        delete: {
          result: action?.payload?.result,
          pending: false,
        },
        list: {
          result: state.list.result?.filter(
            (x) => x?._id !== action.payload.result
          ),
        },
      };
    case DELETE_TRANSACTION_MASTER_FAILED:
      return {
        ...state,
        delete: {
          pending: false,
          error: action.payload.error,
        },
      };
    case FETCH_TRANSACTION_MASTER_BY_ID_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case FETCH_TRANSACTION_MASTER_BY_ID_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case FETCH_TRANSACTION_MASTER_BY_ID_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;
    default:
      return state;
  }
};

export default TransactionMasterReducer;
