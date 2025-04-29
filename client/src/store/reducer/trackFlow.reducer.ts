import {
  FETCH_TRACK_FLOW_STATUS_FAILED,
  FETCH_TRACK_FLOW_STATUS_REQUEST,
  FETCH_TRACK_FLOW_STATUS_SUCCESS,
  TrackFlowActionTypes,
} from "../action/trackFlow.action";
import { TrackFlowAppStore } from "@/interface/trackflow";

const initialState: TrackFlowAppStore = new TrackFlowAppStore();

const trackFlowReducer = (
  state = initialState,
  action: TrackFlowActionTypes
) => {
  switch (action.type) {
    case FETCH_TRACK_FLOW_STATUS_REQUEST:
      return {
        ...state,
        list: {
          pending: true,
        },
      } as typeof initialState;
    case FETCH_TRACK_FLOW_STATUS_SUCCESS:
      return {
        ...state,
        list: {
          result: action.payload.result,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_TRACK_FLOW_STATUS_FAILED:
      return {
        ...state,
        list: {
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    default:
      return state;
  }
};

export default trackFlowReducer;
