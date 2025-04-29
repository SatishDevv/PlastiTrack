import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateFailed,
  authenticateSuccess,
  forgetPasswordFailed,
  forgetPasswordSuccess,
  FORGOT_PASSWORD_REQUEST,
  IForgetPasswordRequestAction,
  LOGOUT_USER_REQUEST,
} from "../action/auth.action";
import { IAxiosResponse } from "@/interface/generic.model";
import AuthService from "@/service/auth.service";
import { IAuthenticationRequestModel } from "@/interface/auth.model";
function* authenticateUser(action: {
  type: string;
  payload: IAuthenticationRequestModel;
}) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AuthService.authenticateUser,
      action.payload
    );
    yield put(
      authenticateSuccess({ result: response.data, error: [], pending: false })
    );
    AuthService.setAuthDetail(response?.data);
  } catch (error: any) {
    yield put(
      authenticateFailed({
        error: [error.response.data.msg],
        pending: false,
      })
    );
  }
}

function* forgetPassword(action: IForgetPasswordRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AuthService.forgetPassowrd,
      action.payload
    );
    yield put(
      forgetPasswordSuccess({ result: response.data, error: [], pending: false })
    );
  } catch (error: any) {
    yield put(
      forgetPasswordFailed({
        error: [error.response.data.msg],
        pending: false,
      })
    );
  }
}


function* logoutUser() {
  yield call(AuthService.logoutUser);
}

export default function* authenticateUserSaga() {
  yield all([
    takeLatest(AUTHENTICATE_USER_REQUEST, authenticateUser),
    takeLatest(LOGOUT_USER_REQUEST, logoutUser),
    takeLatest(FORGOT_PASSWORD_REQUEST, forgetPassword),
  ]);
}
