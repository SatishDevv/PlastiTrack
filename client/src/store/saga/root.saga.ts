import { all, fork } from "redux-saga/effects";
import statusSaga from "./status.saga";
import authenticateUserSaga from "./auth.saga";
import AssignmentContainerSaga from "./assignment.container.saga";
import userSaga from "./user.saga";
import roleSaga from "./role.saga";
import containerSaga from "./container.saga";
import transactionMasterSaga from "./transaction.master.saga";
import trackFlowSaga from "./trackFlow.saga";
import allotContainerSaga from "./allot.assignments.saga";

function* rootSaga() {
  yield all([
    fork(statusSaga),
    fork(authenticateUserSaga),
    fork(AssignmentContainerSaga),
    fork(userSaga),
    fork(roleSaga),
    fork(containerSaga),
    fork(transactionMasterSaga),
    fork(trackFlowSaga),
    fork(allotContainerSaga)
  ]);
}

export default rootSaga;
