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
import {
  fetchContainerCountRequest,
  fetchContainerRequest,
} from "@/store/action/container.action";
import {
  addTransactionMasterRequest,
  fetchTransactionMasterBYIdRequest,
} from "@/store/action/transaction.master.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { ArrowBigDownDash, ArrowLeft, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AnyAction } from "redux-saga";
import * as Yup from "yup";

const TransactionMasterAddApp = () => {
  //mention hooks
  const { id } = useParams();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  //mention selectors

  const transactionFormStore = useSelector(
    (state: any) => state.transaction.update
  );

  const container = useSelector((x: AppState) => x.container.list.result || []);
  const containerCount = useSelector(
    (x: AppState) => x.container.view.result || []
  );
  console.log(containerCount);

  const loginUser = useSelector((x: AppState) => x.auth.result);

  //mention states
  const [transactionData, setTransactionData] = useState<any[]>([
    {
      containerId: "",
      createdBy: "",
      containerQuantity: "",
      containerName: "",
      containerSize: "",
      // remainingStock: Array.isArray(containerCount)? containerCount.length: containerCount? 1: 0,
      remainingStock: containerCount,
      // totalQuantity: "",
    },
  ]);

  useEffect(() => {
    dispatch(fetchContainerRequest());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionMasterBYIdRequest(id));
    }
  }, [id]);

  useEffect(() => {
    if (transactionFormStore?.result) {
      setTransactionData([
        {
          containerId: transactionFormStore.result.containerId || "",
          createdBy: loginUser?._id || "",
          containerQuantity:
            transactionFormStore.result.containerQuantity || "",
        },
      ]);
    }
  }, [transactionFormStore?.result]);

  const validationSchema = Yup.object().shape({
    transactions: Yup.array().of(
      Yup.object().shape({
        containerId: Yup.string().required("Container is required"),
        totalQuantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1")
          .test(
            "max-stock",
            "Quantity cannot exceed available stock",
            function (value) {
              const { remainingStock } = this.parent;
              return !value || !remainingStock || value <= remainingStock;
            }
          ),
        remainingStock: Yup.number().required("Missing stock info"),
      })
    ),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const payload = values?.transactions?.map((tx: any) => ({
      containerId: tx.containerId,
      totalQuantity: tx.totalQuantity,
      createdBy: loginUser?._id,
    }));

    if (id) {
      await dispatch(addTransactionMasterRequest({ _id: id, ...payload[0] }));
      setIsSubmitted(true);
      resetForm();
    } else {
      await dispatch(addTransactionMasterRequest(payload));
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (transactionFormStore?.result?.transaction) {
      const containerInfo =
        transactionFormStore?.result?.transaction?.containerId;

      setTransactionData([
        {
          containerId: containerInfo?._id || "", // <- Correct way to access containerId
          totalQuantity:
            transactionFormStore?.result.transaction?.totalQuantity || 0,
          remainingStock: containerInfo?.inStock || 0,
          containerName: containerInfo?.containerName || "",
          containerSize: containerInfo?.containerSize || "",
        },
      ]);
    }
  }, [transactionFormStore.result, loginUser]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // NOTE: Use this only for Navigation once form submitted
  useEffect(() => {
    console.log(
      !transactionFormStore?.pending,
      !transactionFormStore?.error?.length
    );

    if (
      !transactionFormStore?.pending &&
      !transactionFormStore?.error?.length &&
      isSubmitted
    ) {
      navigate(ROUTE_URL.TRANSACTION_MASTER.LIST);
      toast.success("Transaction Save Successfully!");
    }
  }, [transactionFormStore?.pending]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            <ArrowBigDownDash size={20} strokeWidth={2} />
          </div>
          <span className="text-md font-semibold">Add Transactions</span>
        </div>
        <Link to={ROUTE_URL.TRANSACTION_MASTER.LIST}>
          <Button className="px-6 py-2">
            <ArrowLeft /> Back
          </Button>
        </Link>
      </div>

      <Separator />

      <Formik
        initialValues={{ transactions: transactionData }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true} // Optional, but also helps
        enableReinitialize={true} // <- important!
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form>
            <FieldArray name="transactions">
              {() => (
                <>
                  {values.transactions.map((tx, index) => (
                    <Card
                      key={index}
                      className="w-full shadow-2xl rounded-2xl border mb-6"
                    >
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="font-semibold mb-1">
                              Container *
                            </Label>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full flex justify-between"
                                >
                                  {tx.containerName || "Select Container"}
                                  <ChevronDownIcon className="w-5 h-5 ml-2" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                side="bottom"
                                align="start"
                                className="max-h-60 overflow-y-auto p-1 w-full min-w-[200px] sm:min-w-[300px] lg:min-w-[960px]"
                              >
                                {Array.isArray(container) &&
                                  container.map((item) => (
                                    <DropdownMenuItem
                                      key={item._id}
                                      onClick={() => {
                                        setFieldValue(
                                          `transactions.${index}.containerId`,
                                          item._id
                                        );
                                        setFieldValue(
                                          `transactions.${index}.containerName`,
                                          item.containerName
                                        );
                                        setFieldValue(
                                          `transactions.${index}.containerSize`,
                                          item.containerSize
                                        );
                                        setFieldValue(
                                          `transactions.${index}.remainingStock`,
                                          item.remainingStock
                                        );
                                        setFieldTouched(
                                          `transactions.${index}.totalQuantity`,
                                          true,
                                          false
                                        );
                                        dispatch(
                                          fetchContainerCountRequest({
                                            containerId: item._id,
                                          })
                                        );
                                      }}
                                      className="w-full px-4 py-2 text-left !justify-start !items-start flex"
                                    >
                                      {item.containerName}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label className="font-semibold mb-1">
                                Container Size
                              </Label>
                              <Input disabled value={tx.containerSize || ""} />
                            </div>
                            <div>
                              <Label className="font-semibold mb-1">
                                In Stock
                              </Label>
                              {/* <Input disabled value={containerCount} /> */}
                              <Input
                                disabled
                                value={
                                  Array.isArray(containerCount)
                                    ? containerCount.length
                                    : typeof containerCount === "number"
                                    ? containerCount
                                    : 0
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="font-semibold mb-1">
                              Quantity *
                            </Label>
                            <Field
                              as={Input}
                              type="number"
                              name={`transactions.${index}.totalQuantity`}
                              className="mt-1 rounded-lg w-full"
                            />
                            <ErrorMessage
                              name={`transactions.${index}.totalQuantity`}
                              component="p"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </FieldArray>
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="text-md font-semibold rounded-lg transition flex items-center"
              >
                <ArrowBigDownDash /> <span>Submit</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionMasterAddApp;
