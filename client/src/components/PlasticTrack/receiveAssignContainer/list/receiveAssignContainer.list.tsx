import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTE_URL } from "@/constant/routes.const";
import {
  fetchAssignContainerForReceiveRequest,
  receiveAssignmentForUserRequest,
} from "@/store/action/assign.container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ChartNoAxesCombined, Edit, MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { AnyAction } from "redux-saga";

const ReceiveAssignContainerListApp = () => {
  const userId = useSelector((x: AppState) => x.auth.result?._id);
  const assignContainer =
    useSelector((x: AppState) => x.assignmentContainer.list.result) || [];


  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  useEffect(() => {
    if (userId) {
      console.log(userId);

      dispatch(fetchAssignContainerForReceiveRequest(userId));
      console.log(userId);
    }
  }, [dispatch, userId]);

  const handleDispatch = (_id: string) => {
    if (!_id) return;

    const payload = { _id };
    dispatch(receiveAssignmentForUserRequest(payload));
    // Show success toast
    toast.success("Receive successfully!");
  };

  return (
    <div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              Transaction ID
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              To User
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              Container
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              Quantity
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              Action Type
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              Created On
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignContainer?.length > 0 ? (
            assignContainer?.map((item: any, index: number) => (
              <TableRow key={index} className="border-b">
                <TableCell className="px-4 py-3 font-medium">
                  {item?.transactionId}
                </TableCell>
                <TableCell className="px-4 py-3">{item?.firstName}</TableCell>
                <TableCell className="px-4 py-3">
                  {item?.containerName}
                </TableCell>
                <TableCell className="px-4 py-3">
                  {item?.quantity || "No Container Name"}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge
                    className={
                      item?.actionType === "Allot"
                        ? "bg-red-200 text-red-800  hover:bg-red-300"
                        : item?.actionType === "Dispatch"
                        ? "bg-orange-200 text-orange-800  hover:bg-orange-300"
                        : item?.actionType === "Received"
                        ? "bg-green-200 text-green-800  hover:bg-green-300"
                        : "bg-gray-200 text-gray-800  hover:bg-gray-500"
                    }
                  >
                    {item?.actionType || "---"}
                  </Badge>{" "}
                </TableCell>
                <TableCell className="px-4 py-3">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "No Status"}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`p-2 rounded-md ${
                          item.isAssigned
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-muted"
                        }`}
                        disabled={item.isAssigned}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        asChild
                        disabled={item.isAssigned}
                        className={
                          item.isAssigned ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        <Link
                          to={
                            item.isAssigned
                              ? "#"
                              : `${ROUTE_URL.ASSIGNCONTAINER.LIST}/${item?._id}`
                          }
                          className="flex items-center space-x-2"
                          onClick={(e) => item.isAssigned && e.preventDefault()}
                        >
                          <Edit size={16} strokeWidth={2} />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        disabled={item.isAssigned}
                        className={`${
                          item.isAssigned
                            ? "opacity-50 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50 cursor-pointer"
                        }`}
                        // onClick={() => {
                        //   handleDelete(item._id);
                        // }}
                      >
                        <span className="flex items-center gap-2">
                          <ChartNoAxesCombined size={16} strokeWidth={2} />
                          Delete
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="flex px-4 py-3 gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={!item?._id}
                        className="bg-orange-200 hover:bg-orange-300 text-orange-800 font-semibold py-2 px-4 rounded-full"
                      >
                        Receive
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Receive</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to Receive this Transaction{" "}
                          {item?.transactionId} ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDispatch(item?._id)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-3">
                <DataNotFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReceiveAssignContainerListApp;
