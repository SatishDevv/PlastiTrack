import { AuthenticationModel } from "@/interface/auth.model";
import { AppStore } from "@/interface/generic.model";
import { AUTHENTICATE_USER_FAILED, AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AuthenticateActions, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../action/auth.action";

const initialState: AppStore<AuthenticationModel> =
  new AppStore<AuthenticationModel>();
  

  const authReducer = ( state = initialState, action: AuthenticateActions ) => {
    switch(action.type) {
        case AUTHENTICATE_USER_REQUEST:
            return {
              ...state,
              error: [],
              pending: true,
            } as typeof initialState;
            case AUTHENTICATE_USER_SUCCESS:
              return {
                ...state,
                result: action.payload.result,
                pending: false,
              } as typeof initialState;
          case AUTHENTICATE_USER_FAILED:
            return {
              ...state,
              pending: false,
              error: action.payload.error,
            } as typeof initialState;
             case FORGOT_PASSWORD_REQUEST:
                  return {
                    ...state,
                    update: {
                      result: null,
                      pending: true,
                      error: [],
                    },
                  } as typeof initialState;
            
                case FORGOT_PASSWORD_SUCCESS:
                  return {
                    ...state,
                    update: {
                      result: action.payload.result,
                      pending: false,
                      error: [],
                    },
                  } as typeof initialState;
            
                case FORGOT_PASSWORD_FAILED:
                  return {
                    ...state,
                    update: {
                      error: action.payload.error,
                      pending: false,
                    },
                  } as typeof initialState;
            default:
                return state;
        }
  };

  export default authReducer;