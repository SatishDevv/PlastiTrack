import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ROUTE_URL } from "@/constant/routes.const";
import { IUserModel } from "@/interface/user.model";
import { fetchRoleRequest } from "@/store/action/role.action";
import {
  addUserRequest,
  fetchByIdUserRequest,
} from "@/store/action/user.action.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AnyAction } from "redux-saga";
import * as Yup from "yup";

const UserAddApp = () => {
  //mention hooks

  const { id } = useParams();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  //mention selectors

  const role = useSelector((x: AppState) => x.role.list.result);
  const userFromStore = useSelector(
    (state: AppState) => state.user.update
  );

  // mention state

  const [roleDrop, setRoleDrop] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  console.log(setIsSubmitted);
  
  const [userData, setUserData] = useState<IUserModel[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      roleId: "",
      roleName: "",
    },
  ]);

  useEffect(() => {
    if (id) {
      dispatch(fetchByIdUserRequest(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(fetchRoleRequest());
  }, []);

  useEffect(() => {
    if (userFromStore) {
      setUserData([
        {
          firstName: userFromStore?.result?.firstName || "",
          lastName: userFromStore?.result?.lastName || "",
          email: userFromStore?.result?.email || "",
          contactNo: userFromStore?.result?.contactNo || "",
          roleId: userFromStore?.result?.roleId || "",
          roleName: userFromStore?.result?.roleName || "",
        },
      ]);
      setRoleDrop(userFromStore?.result?.roleName || "Select Role");
    }
  }, [userFromStore]);

  const handleInputChange = (index: any, field: string, value: string) => {
    setUserData((prevUserData) => {
      const updatedUserData = [...prevUserData]; // Copy existing state
      updatedUserData[index] = { ...updatedUserData[index], [field]: value }; // Update field
      return updatedUserData;
    });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Name is requ ired"),
    email: Yup.string().required("Name is required"),
    contactNo: Yup.string()
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must contain only digits and be between 10 to 15 characters long"
      )
      .required("Phone Number is required"),
    roleId: Yup.string().required("Role is required"),
  });


  const handleSubmit = async (values: IUserModel, { resetForm }: any) => {
    if (id) {
      const updatedValues = { ...values, _id: id };
      await dispatch(addUserRequest(updatedValues)); // Send array of users
      resetForm();
      navigate("/user");
    } else {
      const newUserArray = [values]; // Wrap in array
      await dispatch(addUserRequest(newUserArray));
      setTimeout(() => {
        navigate(ROUTE_URL.USER.LIST);
      }, 1000);
      toast.success("User Save Successfully!");
      resetForm();
    }
  };

  useEffect(() => {
    if (!userFromStore?.pending && !userFromStore?.error?.length && isSubmitted) {
      navigate(ROUTE_URL.USER.LIST);
      toast.success("User Save Successfully!");
    }
  }, [userFromStore?.pending]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold">
            💬
          </div>
          <span className="text-md font-semibold">User</span>
        </div>
        {/* <Button size="sm" className="btn btn-primary btn-sm">Back</Button> */}
        <Link to={`${ROUTE_URL.USER.LIST}`}>
          <Button type="button" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg"></i> Back
          </Button>
        </Link>
      </div>
      <Separator className="mt-2 p-0.5" />
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-sm font-semibold">User Details</h2>
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <Formik
          enableReinitialize
          initialValues={userData[0]}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <Card className="w-full max-w-xl p-10 shadow-2xl rounded-2xl mb-6">
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="font-semibold">First Name</Label>
                      <Field
                        as={Input}
                        name="firstName"
                        type="text"
                        className="mt-1 border rounded-lg"
                        onChange={(e: any) =>
                          handleInputChange(0, "firstName", e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">Last Name</Label>
                      <Field
                        as={Input}
                        name="lastName"
                        type="text"
                        className="mt-1 rounded-lg"
                        onChange={(e: any) =>
                          handleInputChange(0, "lastName", e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">Email</Label>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        className="mt-1 rounded-lg"
                        onChange={(e: any) =>
                          handleInputChange(0, "email", e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold">Phone</Label>
                      <Field
                        as={Input}
                        name="contactNo"
                        type="text"
                        className="mt-1 border rounded-lg"
                        onChange={(e: any) =>
                          handleInputChange(0, "contactNo", e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="contactNo"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="w-full mt-2">
                      <label className="font-semibold">Role</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full flex justify-between items-center"
                          >
                            {roleDrop || "Select Role"}
                            <ChevronDownIcon className="w-5 h-5 ml-2 transition-transform duration-300" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-full max-h-60 overflow-y-auto"
                        >
                          {role?.map((roles) => (
                            <DropdownMenuItem
                              key={roles?._id}
                              onClick={() => {
                                // Update role selection dropdown
                                setRoleDrop(roles.roleName);
                                setUserData((prevUserData) => {
                                  const updatedUserData = [...prevUserData];
                                  updatedUserData[0] = {
                                    ...updatedUserData[0],
                                    roleId: roles?._id || "",
                                    roleName: roles?.roleName || "",
                                  };
                                  return updatedUserData;
                                });
                              }}
                            >
                              {roles?.roleName}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div>
                <Button type="submit" className="btn btn-primary mt-4">
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

export default UserAddApp;
