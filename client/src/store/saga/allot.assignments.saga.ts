import { all, call, put, takeLatest } from "redux-saga/effects";
import { ADD_ALLOT_CONTAINER_REQUEST, addAllotContainerFailed, addAllotContainerSuccess, FETCH_ALLOT_CONTAINER_REQUEST, fetchAllotContainerFailed, fetchAllotContainerSuccess } from "../action/allot.assignments.action";
import { IAxiosResponse } from "@/interface/generic.model";
import AllotContainerService from "@/service/allot.assignments.service";

function* fetchAllotContainer(action: any) {  
  try {
    const response: IAxiosResponse<any> = yield call(
        AllotContainerService.fetchAllotContainer, action.payload
    );    

    yield put(
      fetchAllotContainerSuccess({
        result: response.data,
        error: [],
        pending: false,
      })
    );
  } catch (error) {
    yield put(
      fetchAllotContainerFailed({ result: null, error: [], pending: false })
    );
  }
}

function* addAllotContainer(action: any) {
  const data = action.payload;
  console.log(data);
  try {
    let response: IAxiosResponse<any>;

    if (action.payload?.id) {
      response = yield call(
        AllotContainerService.updateAssignmentContainer,
        action.payload
      );
    } else {
      response = yield call(
        AllotContainerService.addAssignmentContainer,
        action.payload
      );
    }

    yield put(
      addAllotContainerSuccess({
        result: response?.data,
        error: [],
        pending: false,
      })
    );
  } catch (error: any) {
    yield put(
      addAllotContainerFailed({
        result: error?.response?.data,
        error: error?.response?.data,
        pending: false,
      })
    );
  }
}

export default function* allotContainerSaga() {
  yield all([
    takeLatest(FETCH_ALLOT_CONTAINER_REQUEST, fetchAllotContainer),
    takeLatest(ADD_ALLOT_CONTAINER_REQUEST, addAllotContainer),
  ]);
}
  