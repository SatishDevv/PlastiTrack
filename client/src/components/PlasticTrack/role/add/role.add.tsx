import { Separator } from "@/components/ui/separator";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IRoleModel } from "@/interface/role.model";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoleRequest,
  fetchByIdAddRoleRequest,
} from "@/store/action/role.action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AppState } from "@/store/reducer/root.reducer";
import { AnyAction } from "redux-saga";
import { Link, useNavigate, useParams } from "react-router";
import { ROUTE_URL } from "@/constant/routes.const";
import { toast } from "react-toastify";

const RoleAddApp = () => {
  //mention hooks
  const { id } = useParams();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const navigate = useNavigate();

  //mention selectors

  const roleFormStore = useSelector(
    (state: AppState) => state.role.update
  );

  // const roleForm = useSelector((state: AppState) => state.role.update);

  //mention states

  const [roleData, setRoleData] = useState<IRoleModel>({
    roleName: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchByIdAddRoleRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (roleFormStore) {
      setRoleData({ roleName: roleFormStore.result?.roleName || "" });
    }
  }, [roleFormStore]);
  //
  const validationSchema = Yup.object({
    roleName: Yup.string().required("Role Name is required"),
  });

  const handleSubmit = async (values: IRoleModel, { resetForm }: any) => {
    if (id) {
      const updatedValues = { ...values, _id: id };
      await dispatch(addRoleRequest(updatedValues));
      resetForm();
      setIsSubmitted(true);
    } else {
      await dispatch(addRoleRequest(values));
      setIsSubmitted(true);
    }
  };

  // NOTE: Use this only for Navigation once form submitted
  useEffect(() => {
    console.log(!roleFormStore?.pending, !roleFormStore?.error?.length);

    if (!roleFormStore?.pending && !roleFormStore?.error?.length && isSubmitted) {
      navigate(ROUTE_URL.ROLE.LIST);
      toast.success("Role Save Successfully!");
    }
  }, [roleFormStore?.pending]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold">
            💬
          </div>
          <span className="text-md font-semibold">Role</span>
        </div>
        <Link to={`${ROUTE_URL.ROLE.LIST}`}>
          <Button type="button" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg"></i> Back
          </Button>
        </Link>
      </div>
      <Separator className="mt-2 p-0.5" />
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-sm font-semibold">Role Details</h2>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <Formik
          enableReinitialize
          initialValues={roleData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="space-y-6 w-full max-w-3xl"
            >
              <Card className="p-10 shadow-2xl rounded-2xl mb-6">
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <Label className="font-semibold">Role Name</Label>
                      <Field
                        as={Input}
                        name="roleName"
                        type="text"
                        className="mt-1 border border-gray-300 rounded-lg w-full"
                      />
                      <ErrorMessage
                        name="roleName"
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
                  className="py-3 px-6 text-lg font-semibold text-white rounded-lg transition btn btn-primary btn-sm"
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

export default RoleAddApp;
