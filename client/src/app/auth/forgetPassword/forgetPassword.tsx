import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IAuthenticationRequestModel } from "@/interface/auth.model";
import { cn } from "@/lib/utils";
import { forgetPasswordRequest } from "@/store/action/auth.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux-saga";
import { ThunkDispatch } from "redux-thunk";

const ForgetPasswordApp = () => {
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const [useLoginDetail] = useState<IAuthenticationRequestModel>({
      email: "",
    //   password: "17def283",
    });
     const onForget = async (values: any) => {
        // values?.preventDefault();
        dispatch(forgetPasswordRequest(values));
      };
    return(
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>Forget Password</CardTitle>
              <CardDescription>
                Enter your email below to reset your password   
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik initialValues={useLoginDetail} onSubmit={onForget}>
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
                      
                   
                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Loading..." : "Submit"}
                        </Button>

                       
                      </div>
                    </div>
                   
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    )
}

export default ForgetPasswordApp;