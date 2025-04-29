import { UserAppStore } from "@/interface/user.model";
import {
  ADD_USER_FAILED,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  FETCH_BY_ID_USER_SUCCESS,
  FETCH_BY_ID_USER_FAILED,
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_BY_ID_USER_REQUEST,
  FILTER_FETCH_USER_REQUEST,
  FILTER_FETCH_USER_SUCCESS,
  FILTER_FETCH_USER_FAILED,
  FILTER_FETCH_CONSUMER_REQUEST,
  FILTER_FETCH_CONSUMER_SUCCESS,
  FILTER_FETCH_CONSUMER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  RESET_DELETE_USER,
} from "../action/user.action.action";

const initialState: UserAppStore = new UserAppStore();

const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_USER_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case ADD_USER_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case ADD_USER_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case ADD_USER_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    //
    case FETCH_BY_ID_USER_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_USER_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_USER_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;
    case FILTER_FETCH_USER_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FILTER_FETCH_USER_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FILTER_FETCH_USER_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FILTER_FETCH_CONSUMER_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FILTER_FETCH_CONSUMER_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FILTER_FETCH_CONSUMER_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    //DELETE
    case DELETE_USER_REQUEST:
      return {
        ...state,
        delete: {
          pending: true,
        },
      };
    case DELETE_USER_SUCCESS:
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
    case DELETE_USER_FAILED:
      return {
        ...state,
        delete: {
          pending: false,
          error: action.payload.error,
        },
      };
    case RESET_DELETE_USER:
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

export default UserReducer;
