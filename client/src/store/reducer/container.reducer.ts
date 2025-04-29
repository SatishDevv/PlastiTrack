import { ContainerAppStore } from "@/interface/container";
import {
  ADD_CONTAINER_FAILED,
  ADD_CONTAINER_REQUEST,
  ADD_CONTAINER_SUCCESS,
  ContainerActions,
  FETCH_ALL_CONTAINER_FAILED,
  FETCH_ALL_CONTAINER_REQUEST,
  FETCH_ALL_CONTAINER_SUCCESS,
  FETCH_BY_ID_CONTAINER_REQUEST,
  FETCH_BY_ID_CONTAINER_SUCCESS,
  FETCH_BY_ID_CONTAINER_FAILED,
  DELETE_CONTAINER_REQUEST,
  DELETE_CONTAINER_SUCCESS,
  DELETE_CONTAINER_FAILED,
  FETCH_CONSUMER_TREND_REQUEST,
  FETCH_CONSUMER_TREND_SUCCESS,
  FETCH_CONSUMER_TREND_FAILED,
  FETCH_VENDOR_TREND_REQUEST,
  FETCH_VENDOR_TREND_SUCCESS,
  FETCH_VENDOR_TREND_FAILED,
  FETCH_CONTAINER_COUNT_REQUEST,
  FETCH_CONTAINER_COUNT_SUCCESS,
  FETCH_CONTAINER_COUNT_FAILED,
  FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST,
  FETCH_CONTAINER_COUNT_FOR_ALLOT_SUCCESS,
  FETCH_CONTAINER_COUNT_FOR_ALLOT_FAILED,
} from "../action/container.action";

const initialState: ContainerAppStore = new ContainerAppStore();

const containerReducer = (state = initialState, action: ContainerActions) => {
  switch (action.type) {
    case ADD_CONTAINER_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;

    case ADD_CONTAINER_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;

    case ADD_CONTAINER_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_BY_ID_CONTAINER_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;

    case FETCH_BY_ID_CONTAINER_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;

    case FETCH_BY_ID_CONTAINER_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;

    //#region FETCH ALL
    case FETCH_ALL_CONTAINER_REQUEST:
      return {
        ...state,
        list: {
          ...state.list, // Preserve previous state
          pending: true,
        },
      };
    case FETCH_ALL_CONTAINER_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          result: action.payload.result,
          pending: false,
        },
      };
    case FETCH_ALL_CONTAINER_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          pending: false,
          error: action.payload.error,
        },
      };

    //DELETE
    case DELETE_CONTAINER_REQUEST:
      return {
        ...state,
        list: {
          ...state.list, // Preserve previous state
          pending: true,
        },
      };
    case DELETE_CONTAINER_SUCCESS:
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
    case DELETE_CONTAINER_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          pending: false,
          error: action.payload.error,
        },
      };
      case FETCH_CONSUMER_TREND_REQUEST:
        return {
          ...state,
          view: {
            ...state.view, // Preserve previous state
            pending: true,
          },
        };
      case FETCH_CONSUMER_TREND_SUCCESS:
        return {
          ...state,
          view: {
            ...state.view,
            result: action.payload.result,
            pending: false,
          },
        };
      case FETCH_CONSUMER_TREND_FAILED:
        return {
          ...state,
          view: {
            ...state.view,
            pending: false,
            error: action.payload.error,
          },
        };

        case FETCH_VENDOR_TREND_REQUEST:
          return {
            ...state,
            update: {
              ...state.update, // Preserve previous state
              pending: true,
            },
          };
        case FETCH_VENDOR_TREND_SUCCESS:
          return {
            ...state,
            update: {
              ...state.update,
              result: action.payload.result,
              pending: false,
            },
          };
        case FETCH_VENDOR_TREND_FAILED:
          return{
            ...state,
            update: {
              ...state.update,
              pending: false,
              error: action.payload.error,
            },
          }
          case FETCH_CONTAINER_COUNT_REQUEST:            
            return {
              ...state,
              view: {
                ...state.view, // Preserve previous state
                pending: true,
              },
            };
            
          case FETCH_CONTAINER_COUNT_SUCCESS:
            return {
              ...state,
              view: {
                ...state.view,
                result: action.payload.result,
                pending: false,
              },
            };
          case FETCH_CONTAINER_COUNT_FAILED:
            return{
              ...state,
              view: {
                ...state.view,
                pending: false,
                error: action.payload.error,
              },
            }
            case FETCH_CONTAINER_COUNT_FOR_ALLOT_REQUEST:            
            return {
              ...state,
              view: {
                ...state.view, // Preserve previous state
                pending: true,
              },
            };
            
          case FETCH_CONTAINER_COUNT_FOR_ALLOT_SUCCESS:
            return {
              ...state,
              view: {
                ...state.view,
                result: action.payload.result,
                pending: false,
              },
            };
          case FETCH_CONTAINER_COUNT_FOR_ALLOT_FAILED:
            return{
              ...state,
              view: {
                ...state.view,
                pending: false,
                error: action.payload.error,
              },
            }
    default:
      return state;
  }
};

export default containerReducer;
