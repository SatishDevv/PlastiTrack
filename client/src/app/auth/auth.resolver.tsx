import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTE_URL } from "../../constant/routes.const";
import AuthService from "../../service/auth.service";
import { authenticateSuccess } from "../../store/action/auth.action";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AppState } from "@/store/reducer/root.reducer";
import { AnyAction } from "redux-saga";

/**
 * Check the user is authorised or not.
 * @returns
 */
const AuthResolver = (props: any) => {
  const auth = AuthService.getAuthDetail();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate(ROUTE_URL.LOGIN);
    } else {
      dispatch(
        authenticateSuccess({ result: auth, error: [], pending: false })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isAuthenticated]);

  return auth?.isAuthenticated && props.children;
};

export default AuthResolver;
