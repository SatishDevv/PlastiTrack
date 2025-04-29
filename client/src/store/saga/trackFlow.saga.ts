import { IAxiosResponse } from "@/interface/generic.model";
import {
  FETCH_TRACK_FLOW_STATUS_REQUEST,
  fetchTrackFlowStatusFailed,
  fetchTrackFlowStatusSuccess,
} from "../action/trackFlow.action";
import { all, call, put, takeLatest } from "redux-saga/effects";
import TrackFlowService from "@/service/trackFlow.service";

function* fetchTrackFlowStatus() {
  try {
    const response: IAxiosResponse<any> = yield call(
      TrackFlowService.fetchTrackFlowSTatus
    );
    console.log(response.data);

    yield put(
      fetchTrackFlowStatusSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      fetchTrackFlowStatusFailed({ result: null, error: [], pending: false })
    );
  }
}

export default function* trackFlowSaga() {
  yield all([
    takeLatest(FETCH_TRACK_FLOW_STATUS_REQUEST, fetchTrackFlowStatus),
  ]);
}
