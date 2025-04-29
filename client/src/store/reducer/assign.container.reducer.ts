import { AssignContainerAppStore } from "@/interface/assign.container";
import {
  AssignmentContainerAction,
  FETCH_ASSIGNMENT_CONTAINER_BY_ID_FAILED,
  FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST,
  FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS,
  FETCH_ASSIGNMENT_CONTAINER_FAILED,
  FETCH_ASSIGNMENT_CONTAINER_REQUEST,
  FETCH_ASSIGNMENT_CONTAINER_SUCCESS,
  FETCH_CONTAINER_TRANSACTIONS_REQUEST,
  FETCH_CONTAINER_TRANSACTIONS_SUCCESS,
  FETCH_CONTAINER_TRANSACTIONS_FAILED,
  FETCH_ALL_TRANSACTION_REQUEST,
  FETCH_ALL_TRANSACTION_SUCCESS,
  FETCH_ALL_TRANSACTION_FAILED,
  FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST,
  FETCH_ASSIGNED_CONTAINER_COUNT_SUCCESS,
  FETCH_ASSIGNED_CONTAINER_COUNT_FAILED,
  ALERT_LATEST_TRANSACTION_REQUEST,
  ALERT_LATEST_TRANSACTION_SUCCESS,
  ALERT_LATEST_TRANSACTION_FAILED,
  FETCH_ALL_COUNT_TRANSACTION_REQUEST,
  FETCH_ALL_COUNT_TRANSACTION_SUCCESS,
  FETCH_ALL_COUNT_TRANSACTION_FAILED,
  DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST,
  DISPATCH_ASSIGNMENT_FOR_CONSUMER_SUCCESS,
  DISPATCH_ASSIGNMENT_FOR_CONSUMER_FAILED,
  FETCH_USER_STOCK_MANAGEMENT_REQUEST,
  FETCH_USER_STOCK_MANAGEMENT_SUCCESS,
  FETCH_USER_STOCK_MANAGEMENT_FAILED,
  DELETE_ASSIGNMENT_CONTAINER_REQUEST,
  DELETE_ASSIGNMENT_CONTAINER_SUCCESS,
  DELETE_ASSIGNMENT_CONTAINER_FAILED,
  FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST,
  FETCH_ASSIGNMENT_TRANSACTION_BY_ID_FAILED,
  RECEIVE_ASSIGNMENT_FOR_USER_REQUEST,
  RECEIVE_ASSIGNMENT_FOR_USER_SUCCESS,
  RECEIVE_ASSIGNMENT_FOR_USER_FAILED,
  FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST,
  FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_SUCCESS,
  FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_FAILED,
} from "../action/assign.container.action";

const initialState: AssignContainerAppStore = new AssignContainerAppStore();

const assignmentContainerReducer = (
  state = initialState,
  action: AssignmentContainerAction
) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT_CONTAINER_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_CONTAINER_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_CONTAINER_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_CONTAINER_BY_ID_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_CONTAINER_BY_ID_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_ALL_TRANSACTION_REQUEST:
      console.log(action);
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ALL_TRANSACTION_SUCCESS:
      console.log(action.payload.result);
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ALL_TRANSACTION_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_CONTAINER_TRANSACTIONS_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_CONTAINER_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_CONTAINER_TRANSACTIONS_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_ASSIGNED_CONTAINER_COUNT_REQUEST:
      return {
        ...state,
        update: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ASSIGNED_CONTAINER_COUNT_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ASSIGNED_CONTAINER_COUNT_FAILED:
      return {
        ...state,
        update: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case ALERT_LATEST_TRANSACTION_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case ALERT_LATEST_TRANSACTION_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case ALERT_LATEST_TRANSACTION_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_ALL_COUNT_TRANSACTION_REQUEST:
      return {
        ...state,
        view: {
          ...state.view, // Preserve previous state
          pending: true,
        },
      };
    case FETCH_ALL_COUNT_TRANSACTION_SUCCESS:
      return {
        ...state,
        view: {
          ...state.view,
          result: action.payload.result,
          pending: false,
        },
      };
    case FETCH_ALL_COUNT_TRANSACTION_FAILED:
      return {
        ...state,
        view: {
          ...state.view,
          pending: false,
          error: action.payload.error,
        },
      };

    case DISPATCH_ASSIGNMENT_FOR_CONSUMER_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case DISPATCH_ASSIGNMENT_FOR_CONSUMER_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case DISPATCH_ASSIGNMENT_FOR_CONSUMER_FAILED:
      return {
        ...state,
        update: {
          result: null,
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case FETCH_USER_STOCK_MANAGEMENT_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_USER_STOCK_MANAGEMENT_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_USER_STOCK_MANAGEMENT_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    //DELETE
    case DELETE_ASSIGNMENT_CONTAINER_REQUEST:
      return {
        ...state,
        delete: {
          pending: true,
        },
      };
    case DELETE_ASSIGNMENT_CONTAINER_SUCCESS:
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
    case DELETE_ASSIGNMENT_CONTAINER_FAILED:
      return {
        ...state,
        delete: {
          pending: false,
          error: action.payload.error,
        },
      };
  case FETCH_ASSIGNMENT_TRANSACTION_BY_ID_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_CONTAINER_BY_ID_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case FETCH_ASSIGNMENT_TRANSACTION_BY_ID_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;
      case RECEIVE_ASSIGNMENT_FOR_USER_REQUEST:
        return {
          ...state,
          update: {
            result: null,
            pending: true,
            error: [],
          },
        } as typeof initialState;
      case RECEIVE_ASSIGNMENT_FOR_USER_SUCCESS:
        return {
          ...state,
          update: {
            result: action.payload.result,
            pending: false,
          },
        } as typeof initialState;
      case RECEIVE_ASSIGNMENT_FOR_USER_FAILED:
        return {
          ...state,
          update: {
            result: null,
            pending: false,
            error: action.payload.error,
          },
        } as typeof initialState;
        case FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_REQUEST:
          return {
            ...state,
            list: {
              pending: true,
            },
          } as typeof initialState;
        case FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_SUCCESS:
          return {
            ...state,
            list: {
              result: action.payload.result,
              pending: false,
            },
          } as typeof initialState;
        case FETCH_ASSIGNMENT_CONTAINER_FOR_RECEIVE_FAILED:
          return {
            ...state,
            list: {
              pending: false,
              error: action.payload.error,
            },
          } as typeof initialState;
    //#endregion
    default:
      return state;
  }
};

export default assignmentContainerReducer;
