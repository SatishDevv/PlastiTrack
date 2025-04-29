import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AppState } from "@/store/reducer/root.reducer";
import { IAuthenticationRequestModel } from "@/interface/auth.model";
import { authenticateRequest } from "@/store/action/auth.action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "@/constant/routes.const";
import AuthService from "@/service/auth.service";

type LoginProps = {};

export const Login: FC<LoginProps> = () => {
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const isAuthenticated = AuthService.getAuthDetail()?.isAuthenticated;
  const navigate = useNavigate();

  // Get authentication result from Redux store
  const auth = useSelector((state: AppState) => state.auth);

  const [useLoginDetail] = useState<IAuthenticationRequestModel>({
    email: "admin@gmail.com",
    password: "de500bc0",
  });

  useEffect(() => {
    // NOTE: Currently checking both localstorage & store for auth flag
    if (isAuthenticated || auth?.result?.isAuthenticated) {
      navigate(ROUTE_URL.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.result?.isAuthenticated]);

  const onLogin = async (values: any) => {
    // values?.preventDefault();
    dispatch(authenticateRequest(values));
  };

  return !isAuthenticated ? (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik initialValues={useLoginDetail} onSubmit={onLogin}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          className="input-class"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="grid gap-3">
                      
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          className="input-class"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex items-center">
                          {/* <Label htmlFor="password">Password</Label>
                          <a
                            href="/forgetPasswordApp"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a> */}
                          <Link to={ROUTE_URL.FORGET_PASSWORD} className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            {/* <Button
                              type="button"
                              className="btn btn-primary btn-sm"
                            > */}
                              <i className="bi bi-plus-lg"></i>forget password
                            {/* </Button> */}
                          </Link>
                        </div>
                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Logging in..." : "Login"}
                        </Button>

                        <Button variant="outline" className="w-full">
                          Login with Google
                        </Button>
                      </div>
                    </div>
                    {/* <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <a href="#" className="underline underline-offset-4">
                        Sign up
                      </a>
                    </div> */}
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ) : null;
};
