import { StatusAppStore } from "@/interface/status.model";
import {
  ADD_STATUS_FAILED,
  ADD_STATUS_REQUEST,
  ADD_STATUS_SUCCESS,
  FETCH_STATUS_FAILED,
  FETCH_STATUS_REQUEST,
  FETCH_STATUS_SUCCESS,
  StatusActions,
  FETCH_BY_ID_STATUS_REQUEST,
  FETCH_BY_ID_STATUS_SUCCESS,
  FETCH_BY_ID_STATUS_FAILED,
  RESET_DELETE_STATUS,
  DELETE_STATUS_REQUEST,
  DELETE_STATUS_SUCCESS,
  DELETE_STATUS_FAILED,
} from "../action/status.action";

const initialState: StatusAppStore = new StatusAppStore();

const statusReducer = (state = initialState, action: StatusActions) => {
  switch (action.type) {
    case ADD_STATUS_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case ADD_STATUS_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case ADD_STATUS_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_STATUS_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_STATUS_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    //#endregion
    case FETCH_STATUS_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          result: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_BY_ID_STATUS_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_STATUS_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_STATUS_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    //DELETE
    case DELETE_STATUS_REQUEST:
      return {
        ...state,
        delete: {
          pending: true,
        },
      };
    case DELETE_STATUS_SUCCESS:
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
    case DELETE_STATUS_FAILED:
      return {
        ...state,
        delete: {
          pending: false,
          error: action.payload.error,
        },
      };
    case RESET_DELETE_STATUS:
      return {
        ...state,
        delete: {
          error: [],
          pending: false,
          result: null,
        },
      } as typeof initialState;
    default:
      return state;
  }
};

export default statusReducer;
