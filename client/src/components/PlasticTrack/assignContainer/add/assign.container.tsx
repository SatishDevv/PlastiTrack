import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { IContainerModel } from "@/interface/container";
import { addAllotContainerRequest } from "@/store/action/allot.assignments.action";
import { fetchAssignmentTransactionByIdRequest } from "@/store/action/assign.container.action";
import { fetchContainerCountForAllocateRequest } from "@/store/action/container.action";
import { fetchRoleRequest } from "@/store/action/role.action";
import { fetchStatusRequest } from "@/store/action/status.action";
import { fetchTransactionMasterRequest } from "@/store/action/transaction.master.action";
import { filterFetchUserRequest } from "@/store/action/user.action.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Form, Formik } from "formik";
import {
  ArrowBigDownDash,
  ArrowLeft,
  Boxes,
  ChevronDownIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AnyAction } from "redux-saga";

const AssignContainerApp = () => {
  //mention hooks

  const { id } = useParams();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  //mention selectors

  const container = useSelector((x: AppState) => x.container.view.result);

  console.log(container);

  const user = useSelector((x: AppState) => x.user.list);
  const loginUser = useSelector((x: AppState) => x.auth.result);
  console.log(loginUser);

  const transaction = useSelector((x: AppState) => x.transaction.list);

  //mention states

  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [assignContainerData, setAssignContainerData] = useState<any[]>([
    {
      fromUser: "",
      toUser: "",
      containerId: "",
      containerName: "",
      consumerId: "",
      status: "",
      statusTypeId: "",
      quantity: "",
      createdById: "",
      createdByName: "",
      inStock: container || "",
      firstName: "",
      remainingStock: "",
      uploadDocument: "",
      ETA: "",
      ETD: "",
      comments: "",
      modeOfTransport: "",
      transportationName: "",
      vehicleNumber: "",
      POC_Name: "",
      POC_MobileNumber: "",
      returnDeadlineDate: "",
      containerImages: "",
    },
  ]);

  const role = useSelector((x: AppState) => x.role);

  const selectedRole = useMemo(() => {
    const roles = role?.list?.result || [];
    const selectedName = assignContainerData[0]?.roleName;
    return roles.find(
      (r) => r.roleName.toLowerCase() === selectedName?.toLowerCase()
    );
  }, [role, assignContainerData]);

  useEffect(() => {
    if (selectedRole?._id) {
      dispatch(filterFetchUserRequest(selectedRole._id));
    }
  }, [selectedRole?._id]);

  useEffect(() => {
    dispatch(fetchStatusRequest()); // Ensure this is fired when component mounts
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoleRequest()); // Ensure this is fired when component mounts
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactionMasterRequest());
  }, [dispatch]);

  const handleInputChange = (index: number, field: string, value: any) => {
    setAssignContainerData((prevData) => {
      const updatedData = [...prevData];

      if (field === "consumer") {
        updatedData[index] = {
          ...updatedData[index],
          toUser: value.id,
          firstName: value.name, // Store both ID and name
        };
      }
      if (field === "role") {
        updatedData[index] = {
          ...updatedData[index],
          role: value.id,
          roleName: value.name, // Store both ID and name
        };
      } else if (field === "status") {
        updatedData[index] = {
          ...updatedData[index],
          statusTypeId: value.id,
          status: value.name, // Store both ID and name
        };
      } else if (field === "transaction") {
        const selectedTransaction = transaction?.result?.find(
          (t) => t._id === value.id
        );
        console.log(selectedTransaction);

        const containerId = selectedTransaction?.containerId;

        if (!selectedTransaction) return prevData;

        // Check if transaction is already selected in another form
        const isDuplicate = assignContainerData.some(
          (item, idx) => item.transactionId === value.id && idx !== index
        );

        if (isDuplicate) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [index]:
              "This transaction is already selected in another form. Please choose a different one.",
          }));
          return prevData; // Exit early without updating
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [index]: "" }));
        }

        if (containerId && typeof containerId === "object") {
          const containerInfo = containerId as IContainerModel;

          updatedData[index] = {
            ...updatedData[index],
            transactionId: value.id,
            transactionName: value.name,
            containerId: containerInfo._id || "",
            containerName: containerInfo.containerName || "",
            containerSize: containerInfo.containerSize || "",
            inStock: value.inStock ?? "",
          };
        } else {
          // Fallback in case containerId is just a string
          updatedData[index] = {
            ...updatedData[index],
            transactionId: value.id,
            transactionName: value.name,
            containerId: typeof containerId === "string" ? containerId : "",
            containerName: "",
            containerSize: "",
            inStock: value.inStock ?? "",
          };
        }

        // updatedData[index] = {
        //   ...updatedData[index],
        //   transactionId: value.id,
        //   transactionName: value.name, // just storing id and label
        //   containerId: containerId?._id || "",
        //   containerName: containerId?.containerName || "",
        //   containerSize: containerId?.containerSize || "",
        //   inStock: value.inStock ?? "",
        //   // remainingStock: remainingStock || "",
        // };
      } else if (field === "quantity") {
        // Validate that quantity does not exceed inStock
        if (value > (container || 0)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [index]: "Quantity cannot exceed available in-stock quantity.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [index]: "" }));
          updatedData[index] = {
            ...updatedData[index],
            [field]: value,
          };
        }
      } else {
        updatedData[index] = {
          ...updatedData[index],
          [field]: value,
        };
      }

      return updatedData;
    });
  };

  const addMoreForm = () => {
    setAssignContainerData((prevData: any) => [...prevData, assignContainerData]);
  };

  const handleRemoveForm = (index: number) => {
    setAssignContainerData((prevData) =>
      prevData.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async ({ resetForm }: any) => {
    let isValid = true;
    const newErrors: { [key: number]: string } = {};

    assignContainerData.forEach((data, index) => {
      if (!assignContainerData[0]?.toUser) {
        toast.error("Please select a consumer.");
        isValid = false;
        return;
      }
      if (!data.quantity || Number(data.quantity) <= 0) {
        newErrors[index] = "Quantity must be greater than 0.";
        isValid = false;
      } else if (data.quantity > (data.inStock ?? 0)) {
        newErrors[index] = "Quantity cannot exceed available stock.";
        isValid = false;
      } else if (!data.transactionId || !data.transactionId) {
        newErrors[index] = "Please select Transaction.";
        isValid = false;
      } else if (!assignContainerData[0]?.ETA) {
        toast.error("Please select a ETA.");
        isValid = false;
        return;
      } else if (!assignContainerData[0]?.ETD) {
        toast.error("Please select a ETD.");
        isValid = false;
        return;
      } else if (!assignContainerData[0]?.returnDeadlineDate) {
        toast.error("Please select a Return Deadline Date.");
        isValid = false;
        return;
      }
    });

    setErrors(newErrors);

    if (!isValid) return;

    const formattedData = {
      fromUser: loginUser?._id,
      // toUser:
      createdById: loginUser?._id,
      createdByName: loginUser?.firstName,
      toUser: assignContainerData[0]?.toUser || "",
      uploadDocument: assignContainerData[0]?.consumerId || "",
      ETA: assignContainerData[0]?.ETA || "",
      ETD: assignContainerData[0]?.ETD || "",
      comments: assignContainerData[0]?.comments || "",
      // modeOfTransport: assignContainerData[0]?.modeOfTransport || "",
      transportationName: assignContainerData[0]?.transportationName || "",
      // vehicleNumber: assignContainerData[0]?.vehicleNumber || "",
      POC_Name: assignContainerData[0]?.POC_Name || "",
      POC_MobileNumber: assignContainerData[0]?.consumerId || "",
      returnDeadlineDate: assignContainerData[0]?.returnDeadlineDate || "",
      // containerImages: assignContainerData[0]?.containerImages || "",
      status: "Outward",
      containerData: assignContainerData.map((data) => ({
        containerTransactionId: data.transactionId || "",
        containerId: data.containerId || "", // ✅ now uses each entry correctly
        quantity: data.quantity || 0,
      })),
    };

    await dispatch(addAllotContainerRequest(formattedData));
    toast.success("Transaction Assignment Save Successfully");
    navigate(ROUTE_URL.ASSIGNCONTAINER.LIST);
    resetForm();
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchAssignmentTransactionByIdRequest(id));
    }
  }, [id]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            <Boxes size={20} />
          </div>
          <span className="text-md font-semibold">Allot Containers</span>
        </div>
        <Link to={ROUTE_URL.ASSIGNCONTAINER.LIST}>
          <Button className="px-6 py-2">
            <ArrowLeft /> Back
          </Button>
        </Link>
      </div>

      <Separator />

      {/* 🔹 Combined Consumer + Schedule + Transport Info */}
      <Card className="p-6">
        <h5 className="text-md font-medium">Assignment Details</h5>

        {/* 🔸 Consumer & Document */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="font-semibold mb-1">Role *</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {assignContainerData[0]?.roleName || "Select Role"}
                  <ChevronDownIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-60 overflow-y-auto p-1 w-full min-w-[100px]"
              >
                {role.list?.result?.map((c) => (
                  <DropdownMenuItem
                    key={c._id}
                    onClick={() =>
                      handleInputChange(0, "role", {
                        id: c._id,
                        name: c.roleName,
                      })
                    }
                  >
                    {c.roleName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Label className="font-semibold mb-1">User *</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {assignContainerData[0]?.firstName || "Select User"}
                  <ChevronDownIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-60 overflow-y-auto p-1 w-full min-w-[100px]"
              >
                {user?.result?.map((c) => (
                  <DropdownMenuItem
                    key={c._id}
                    onClick={() =>
                      handleInputChange(0, "consumer", {
                        id: c._id,
                        name: c.firstName,
                      })
                    }
                  >
                    {c.firstName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Label className="font-semibold mb-1">Upload Document</Label>
            <Input
              readOnly
              value={
                assignContainerData[0]?.uploadDocument || "No file selected"
              }
              className="cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            />
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  handleInputChange(0, "uploadDocument", url);
                }
              }}
            />
          </div>
        </div>

        {/* 🔸 Schedule & Contact */}
        <h5 className="text-md font-medium">Schedule & Contact</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="font-semibold mb-1">ETA *</Label>
            <Input
              type="date"
              value={assignContainerData[0]?.ETA || ""}
              onChange={(e) => handleInputChange(0, "ETA", e.target.value)}
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">ETD *</Label>
            <Input
              type="date"
              value={assignContainerData[0]?.ETD || ""}
              onChange={(e) => handleInputChange(0, "ETD", e.target.value)}
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">Return Deadline *</Label>
            <Input
              type="date"
              value={assignContainerData[0]?.returnDeadlineDate || ""}
              onChange={(e) =>
                handleInputChange(0, "returnDeadlineDate", e.target.value)
              }
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">POC Name</Label>
            <Input
              value={assignContainerData[0]?.POC_Name || ""}
              onChange={(e) => handleInputChange(0, "POC_Name", e.target.value)}
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">POC Mobile</Label>
            <div className="flex items-center">
              <span className="text-sm font-medium bg-gray-100 px-2 py-2 border rounded-l-md">
                +91
              </span>
              <Input
                pattern="[0-9]*"
                maxLength={10}
                type="tel"
                className="rounded-l-none"
                value={assignContainerData[0]?.POC_MobileNumber || ""}
                onChange={(e) =>
                  handleInputChange(0, "POC_MobileNumber", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* 🔸 Transport & Notes */}
        <h5 className="text-md font-medium">Transport & Notes</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="font-semibold mb-1">Mode of Transport</Label>
            <Input
              value={assignContainerData[0]?.modeOfTransport || ""}
              onChange={(e) =>
                handleInputChange(0, "modeOfTransport", e.target.value)
              }
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">Transport Name</Label>
            <Input
              value={assignContainerData[0]?.transportationName || ""}
              onChange={(e) =>
                handleInputChange(0, "transportationName", e.target.value)
              }
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">Vehicle Number</Label>
            <Input
              value={assignContainerData[0]?.vehicleNumber || ""}
              onChange={(e) =>
                handleInputChange(0, "vehicleNumber", e.target.value)
              }
            />
          </div>
          <div className="md:col-span-2">
            <Label className="font-semibold mb-1">Comments</Label>
            <Input
              value={assignContainerData[0]?.comments || ""}
              onChange={(e) => handleInputChange(0, "comments", e.target.value)}
            />
          </div>
          <div>
            <Label className="font-semibold mb-1">Container Images</Label>
            <Input
              readOnly
              className="cursor-pointer"
              value={
                assignContainerData[0]?.containerImages || "No file selected"
              }
              onClick={() =>
                document.getElementById("containerImagesUpload")?.click()
              }
            />
            <input
              id="containerImagesUpload"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const urls = files.map((file) => URL.createObjectURL(file));
                handleInputChange(0, "containerImages", urls);
              }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h5 className="text-md font-medium">Container Assignment</h5>
        {assignContainerData.map((data, index) => (
          <Card key={index} className="p-4 border relative">
            {/* Remove Button Positioned Top Right */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveForm(index)}
              className="absolute top-2 right-2 p-1"
            >
              Remove
              <i className="bi bi-x text-lg" />
            </Button>

            <Formik initialValues={data} onSubmit={() => {}}>
              {() => (
                <Form className="space-y-4">
                  {errors[index] && (
                    <p className="text-sm text-red-500 mt-1">{errors[index]}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <Label className="font-semibold mb-1">
                        Transaction *
                      </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            {data.transactionName || "Select Transaction"}
                            <ChevronDownIcon className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="max-h-60 overflow-y-auto p-1 w-full min-w-[100px]"
                        >
                          {transaction?.result?.map((c) => (
                            <DropdownMenuItem
                              key={c._id}
                              onClick={async () => {
                                await dispatch(
                                  fetchContainerCountForAllocateRequest({
                                    transactionId: c._id,
                                    userId: loginUser?._id,
                                  })
                                );
                                handleInputChange(index, "transaction", {
                                  id: c._id,
                                  name: c.transactionId,
                                  inStock: container,
                                });
                              }}
                            >
                              {c.transactionId}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div>
                      <Label className="font-semibold mb-1">Container</Label>
                      <Input disabled value={data.containerName || ""} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="font-semibold mb-1">Size</Label>
                      <Input disabled value={data.containerSize || ""} />
                    </div>
                    <div>
                      <Label className="font-semibold mb-1">In Stock</Label>
                      <Input
                        disabled
                        value={container ? JSON.stringify(container) : ""}
                      />
                    </div>
                    <div>
                      <Label className="font-semibold mb-1">Quantity *</Label>
                      <Input
                        type="number"
                        value={data.quantity || ""}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", +e.target.value)
                        }
                      />
                      {/* {errors[0] && (
                        <p className="text-sm text-red-500 mt-1">{errors[0]}</p>
                      )} */}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="secondary" onClick={addMoreForm}>
                      Add More
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        ))}
      </Card>

      {/* 🔹 Submit */}
      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="px-6 py-2">
          <ArrowBigDownDash /> Submit Assignment
        </Button>
      </div>
    </div>
  );
};

export default AssignContainerApp;
