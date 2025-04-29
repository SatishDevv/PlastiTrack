import { TransactionAppStore } from "@/interface/transaction";
import { ADD_ALLOT_CONTAINER_FAILED, ADD_ALLOT_CONTAINER_REQUEST, ADD_ALLOT_CONTAINER_SUCCESS, AllotAssignmentsActionTypes, FETCH_ALLOT_CONTAINER_FAILED, FETCH_ALLOT_CONTAINER_REQUEST, FETCH_ALLOT_CONTAINER_SUCCESS } from "../action/allot.assignments.action";

const initialState: TransactionAppStore = new TransactionAppStore();

const AllotAssignmentsReducer = (
  state = initialState,
  action: AllotAssignmentsActionTypes
) => {
  switch (action.type) {
    case FETCH_ALLOT_CONTAINER_REQUEST:
      return {
        ...state,
        view: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_ALLOT_CONTAINER_SUCCESS:
      return {
        ...state,
        view: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ALLOT_CONTAINER_FAILED:
      return {
        ...state,
        view: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
        case ADD_ALLOT_CONTAINER_REQUEST:
            return {
              ...state,
              update: {
                result: null,
                pending: true,
                error: [],
              },
            } as typeof initialState;
          case ADD_ALLOT_CONTAINER_SUCCESS:
            return {
              ...state,
              update: {
                result: action.payload.result,
                pending: false,
              },
            } as typeof initialState;
          case ADD_ALLOT_CONTAINER_FAILED:
            return {
              ...state,
              update: {
                result: null,
                pending: false,
                error: action.payload.error,
              },
            } as typeof initialState;
    default:
      return state;
  }
};

export default AllotAssignmentsReducer;
