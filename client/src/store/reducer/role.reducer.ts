import {
  ADD_ROLE_FAILED,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  FETCH_ROLE_FAILED,
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  RoleAction,
  FETCH_BY_ID_ROLE_REQUEST,
  FETCH_BY_ID_ROLE_SUCCESS,
  FETCH_BY_ID_ROLE_FAILED,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  RESET_DELETE_ROLE,
} from "../action/role.action";
import { RoleAppStore } from "@/interface/role.model";

const initialState: RoleAppStore = new RoleAppStore();

const RoleReducer = (state = initialState, action: RoleAction) => {
  switch (action.type) {
    case ADD_ROLE_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case ADD_ROLE_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ROLE_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;

    case FETCH_BY_ID_ROLE_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_ROLE_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_ROLE_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;

    //DELETE
    case FETCH_BY_ID_ROLE_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          pending: true,
        },
      };
    case DELETE_ROLE_SUCCESS:
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
    case DELETE_ROLE_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      };
      case RESET_DELETE_ROLE:
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

export default RoleReducer;
