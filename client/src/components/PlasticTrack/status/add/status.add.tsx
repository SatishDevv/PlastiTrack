import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartNoAxesCombined } from "lucide-react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AppState } from "@/store/reducer/root.reducer";
import { AnyAction } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { IStatusModel } from "@/interface/status.model";
import {
  addStatusRequest,
  fetchbyidaddStatusRequest,
} from "@/store/action/status.action";
import { Link, useNavigate, useParams } from "react-router";
import { ROUTE_URL } from "@/constant/routes.const";
import { toast } from "react-toastify";

const StatusAddApp = () => {

  //mention hooks

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors

  const statusFromStore = useSelector(
    (state: AppState) => state.status.update.result
  );

  const statusFrom = useSelector(
    (state: AppState) => state.status.update
  );

  //mention states
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<IStatusModel>({
    statusType: "",
    statusCode: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchbyidaddStatusRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (statusFromStore) {
      setStatusData({
        statusType: statusFromStore.statusType || "",
        statusCode: statusFromStore.statusCode || "",
      });
    }
  }, [statusFromStore]);

  const validationSchema = Yup.object({
    statusType: Yup.string().required("Type is required"),
    statusCode: Yup.string().required("Status Code is required"),
  });

  const handleSubmit = async (values: IStatusModel, { resetForm }: any) => {
    if (id) {
      const updatedValues = { ...values, _id: id };
      await dispatch(addStatusRequest(updatedValues));
      resetForm();
      setIsSubmitted(true);
    } else {
      await dispatch(addStatusRequest(values));
      setIsSubmitted(true);

    }
  };

    // NOTE: Use this only for Navigation once form submitted
    useEffect(() => {
      console.log(!statusFrom?.pending, !statusFrom?.error?.length);
  
      if (!statusFrom?.pending && !statusFrom?.error?.length && isSubmitted) {
        navigate(ROUTE_URL.STATUS.LIST);
        toast.success("Status Save Successfully!");
      }
    }, [statusFrom?.pending]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white  font-bold">
            <ChartNoAxesCombined size={20} strokeWidth={3} />
          </div>
            </div>
            <Link to={`${ROUTE_URL.STATUS.LIST}`}>
          <Button type="button" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg"></i> Back
          </Button>
        </Link>    
      </div>
      <Separator className="mt-2 p-0.5" />
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-sm font-semibold">Status Details</h2>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <Formik
          enableReinitialize
          initialValues={statusData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="space-y-6 w-full max-w-3xl"
            >
              <Card className="p-10 shadow-2xl rounded-2xl mb-6 w-full max-w-3xl">
                <CardContent>
                  <div className=" grid grid-cols-2 gap-6">
                    <div>
                      <Label className="font-semibold">Status Type</Label>
                      <Field
                        as={Input}
                        name="statusType"
                        type="text"
                        className="mt-1  rounded-lg w-full"
                      />
                      <ErrorMessage
                        name="statusType"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="font-semibold">Status Code</Label>
                      <Field
                        as={Input}
                        name="statusCode"
                        type="text"
                        className="mt-1  rounded-lg w-full"
                      />
                      <ErrorMessage
                        name="statusType"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center mt-6">
                <Button
                  type="submit"
                  className="py-3 px-6 text-lg font-semibold  rounded-lg transition"
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StatusAddApp;
