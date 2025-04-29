import { IAssignContainerModel } from "@/interface/assign.container";
import { AppStore } from "@/interface/generic.model";

//FETCH TRACK FLOW STATUS

export const FETCH_TRACK_FLOW_STATUS_REQUEST = "FETCH_TRACK_FLOW_STATUS_REQUEST";
export const FETCH_TRACK_FLOW_STATUS_SUCCESS = "FETCH_TRACK_FLOW_STATUS_SUCCESS";
export const FETCH_TRACK_FLOW_STATUS_FAILED = "FETCH_TRACK_FLOW_STATUS_FAILED";

export interface IFetchTrackFlowStatusRequestAction {
  type: typeof FETCH_TRACK_FLOW_STATUS_REQUEST;
  // payload: any;
}

export interface IFetchTrackFlowStatusSuccessAction {
  type: typeof FETCH_TRACK_FLOW_STATUS_SUCCESS;
  payload: AppStore<IAssignContainerModel[]>;
}

export interface IFetchTrackFlowStatusFailedAction {
  type: typeof FETCH_TRACK_FLOW_STATUS_FAILED;
  payload: AppStore<IAssignContainerModel[]>;
}



export const fetchTrackFlowStatusRequest = (
  // payload: IAssignContainerRequestModel[]
): IFetchTrackFlowStatusRequestAction => ({
  type: FETCH_TRACK_FLOW_STATUS_REQUEST,
  // payload,
});

export const fetchTrackFlowStatusSuccess = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchTrackFlowStatusSuccessAction => ({
  type: FETCH_TRACK_FLOW_STATUS_SUCCESS,
  payload,
});

export const fetchTrackFlowStatusFailed = (
  payload: AppStore<IAssignContainerModel[]>
): IFetchTrackFlowStatusFailedAction => ({
  type: FETCH_TRACK_FLOW_STATUS_FAILED,
  payload,
});

export type TrackFlowActionTypes =
  | IFetchTrackFlowStatusRequestAction
  | IFetchTrackFlowStatusSuccessAction
  | IFetchTrackFlowStatusFailedAction;