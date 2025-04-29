import { combineReducers } from "redux";
import statusReducer from "./status.reducer";
import authReducer from "./auth.reducer";
import assignmentContainerReducer from "./assign.container.reducer";
import UserReducer from "./user.reducer";
import RoleReducer from "./role.reducer";
import containerReducer from "./container.reducer";
import { LOGOUT_USER_REQUEST } from "../action/auth.action";
import TransactionMasterReducer from "./transaction.master.reducer";
import trackFlowReducer from "./trackFlow.reducer";
import AllotAssignmentsReducer from "./allot.assignments.reducer";

const allReducers = combineReducers({
    status: statusReducer,
    auth: authReducer,
    assignmentContainer: assignmentContainerReducer,
    user: UserReducer,
    role: RoleReducer,
    container: containerReducer,
    transaction: TransactionMasterReducer,
    trackFlow : trackFlowReducer ,
    allotAssignments: AllotAssignmentsReducer
  });
  
  export const rootReducer = (state: any, action: any) => {
    if (action.type === LOGOUT_USER_REQUEST) {
      state = undefined;
    }
    return allReducers(state, action);
  };
  
  export type AppState = ReturnType<typeof rootReducer>;
  export default rootReducer;

// const rootReducer = combineReducers({
//   // status: statusReducer,
//   auth: authReducer
// });

// export type AppState = ReturnType<typeof rootReducer>;

// export default rootReducer;

  