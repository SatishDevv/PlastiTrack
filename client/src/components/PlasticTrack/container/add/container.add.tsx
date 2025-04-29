import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useParams } from "react-router";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/reducer/root.reducer";
import { IContainerModel } from "@/interface/container";
import {
  addContainerRequest,
  fetchbyidaddContainerRequest,
} from "@/store/action/container.action";
import { ROUTE_URL } from "@/constant/routes.const";
import { toast } from "react-toastify";

const ContainerAddApp = () => {
  //mention hooks

  const { id } = useParams();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  //mention selectors

  const user = useSelector((x: AppState) => x.auth.result);
  const containerFromStore   = useSelector(
    (state: AppState) => state.container.update.result
  );

  //mention states

  const [containerData, setContainerData] = useState<IContainerModel>({
    userId: user?._id || null,
    containerName: "",
    containerSize: "",
    inStock: "",
    adminName: user?.firstName || "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchbyidaddContainerRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (containerFromStore && !Array.isArray(containerFromStore)) {
      setContainerData({
        userId: user?._id || null,
        containerName: containerFromStore.containerName || "",
        containerSize: containerFromStore.containerSize || "",
        inStock: containerFromStore.inStock || "",
        adminName: user?.firstName || "",
      });
    }
  }, [containerFromStore]);
  

  const validationSchema = Yup.object({
    containerName: Yup.string().required("Container Name is required"),
    containerSize: Yup.string().required("Container Size is required"),
    inStock: Yup.string().required("In Stock is required"),
  });
  const handleSubmit = async (values: IContainerModel, { resetForm }: any) => {
    if (id) {
      const updatedValues = { ...values, _id: id };
      console.log(updatedValues);
      await dispatch(addContainerRequest(updatedValues));
      resetForm();
      navigate("/container");
    } else {
      await dispatch(addContainerRequest(values));
      setTimeout(() => {
        navigate(ROUTE_URL.CONTAINER.LIST);
      }, 1000);
      toast.success("Container Save Successfully!");
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center  font-bold">
            💬
          </div>
          <span className="text-md font-semibold">Container</span>
        </div>
        <Link to={`${ROUTE_URL.CONTAINER.LIST}`}>
          <Button type="button" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg"></i> Back
          </Button>
        </Link>
      </div>
      <Separator className="mt-2 p-0.5" />
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-sm font-semibold">Container Details</h2>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <Formik
          enableReinitialize
          initialValues={containerData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="space-y-6 w-full max-w-3xl"
            >
              <Card className="w-full max-w-3xl p-10 shadow-2xl rounded-2xl mb-6">
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="font-semibold">Container Name</Label>
                      <Field
                        as={Input}
                        name="containerName"
                        type="text"
                        className="mt-1 boarder-gray-300 rounded-lg"
                      />
                      <ErrorMessage
                        name="containerName"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="font-semibold">Container Size</Label>
                      <Field
                        as={Input}
                        name="containerSize"
                        type="text"
                        className="mt-1 boarder-gray-300 rounded-lg"
                      />
                      <ErrorMessage
                        name="type"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Label className="font-semibold">In Stock</Label>
                      <Field
                        as={Input}
                        name="inStock"
                        type="text"
                        className="mt-1 boarder-gray-300 rounded-lg"
                      />
                      <ErrorMessage
                        name="type"
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
                  className="py-3 px-6 text-lg font-semibold bg-primary rounded-lg transition"
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

export default ContainerAddApp;
