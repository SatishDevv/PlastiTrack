import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ROUTE_URL } from "@/constant/routes.const";
import {
  deleteAssignmentTransactionRequest,
  dispatchAssignmentForConsumerRequest,
  fetchAssignContainerRequest,
} from "@/store/action/assign.container.action";
import { AppState } from "@/store/reducer/root.reducer";
import {
  ChartNoAxesCombined,
  Edit,
  MoreHorizontal,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

const DispatchManagementListApp = () => {
  const pageSize = 10;

  //mention hooks

  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors

  const assignmentList =
    useSelector((state: AppState) => state.assignmentContainer.list.result) ||
    [];
  console.log(assignmentList);

  const userId = useSelector((x: AppState) => x.auth.result?._id);
  console.log(userId);

  //mention states

  // const [displayedList, setDisplayedList] = useState<any[]>([]);
  const [searchTransactionId, setSearchTransactionId] = useState("");
  const [searchContainerName, setSearchContainerName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data when filter updates
  useEffect(() => {
    if (userId) {
      console.log(userId);

      dispatch(fetchAssignContainerRequest(userId));
      console.log(userId);
    }
  }, [ userId]);

  // Total pages for pagination
  const totalPages = Math.ceil((assignmentList?.length || 0) / pageSize);

  // Filtered data based on search
  const filteredList = assignmentList?.filter((item: any) => {
    const transMatch = item?.transactionId
      ?.toLowerCase()
      .includes(searchTransactionId.toLowerCase());
    const containerMatch = item?.containerName
      ?.toLowerCase()
      .includes(searchContainerName.toLowerCase());
    const userMatch = item?.firstName
      ?.toLowerCase()
      .includes(searchUsername.toLowerCase());

    return transMatch && containerMatch && userMatch;
  });

  const handleDispatch = (_id: string) => {
    if (!_id) return;

    const payload = { _id };

    dispatch(dispatchAssignmentForConsumerRequest(payload));

    // Optimistically remove item from UI
    // setDisplayedList((prev) => prev.filter((item) => item._id !== _id));

    // Show success toast
    toast.success("Dispatched successfully!");

    // Re-fetch the list to get updated data
    if (userId) {
      setTimeout(() => {
        dispatch(fetchAssignContainerRequest(userId));
      }, 1000);
    }
  };

  const handleDelete = (id: string = "") => {
    dispatch(deleteAssignmentTransactionRequest(id));
    toast("This transaction Deleted Successfully");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            <Truck size={20} />
          </div>
          <span className="text-md font-semibold">Dispatch Container</span>
        </div>

        <div className="mb-4 flex flex-col items-center">
          {/* Search Inputs */}
          {currentPage === 1 && (
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Input
                value={searchTransactionId}
                onChange={(e) => {
                  setSearchTransactionId(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Transaction ID..."
                className="w-72"
              />
              <Input
                value={searchContainerName}
                onChange={(e) => {
                  setSearchContainerName(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Container Name..."
                className="w-72"
              />
              <Input
                value={searchUsername}
                onChange={(e) => {
                  setSearchUsername(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search User Name..."
                className="w-72"
              />
            </div>
          )}
        </div>

        <Separator className="mt-4" />

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
            {filteredList.length > 0 ? (
              filteredList
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item: any, index: number) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="px-4 py-3 font-medium">
                      {item?.transactionId}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {item?.firstName}
                    </TableCell>
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
                              item.isAssigned
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }
                          >
                            <Link
                              to={
                                item.isAssigned
                                  ? "#"
                                  : `${ROUTE_URL.ASSIGNCONTAINER.LIST}/${item?._id}`
                              }
                              className="flex items-center space-x-2"
                              onClick={(e) =>
                                item.isAssigned && e.preventDefault()
                              }
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
                            onClick={() => {
                              handleDelete(item._id);
                            }}
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
                              Dispatch
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirm Dispatch
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to dispatch this Transaction{" "}
                                {item?.transactionId} ? This action cannot be
                                undone.
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

      {filteredList.length > 0 && (
        <div className="sticky bottom-0 left-0 w-full border-gray-300 shadow-md py-3">
          <Pagination className="flex justify-center">
            <PaginationContent className="flex">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  // disabled={currentPage === 1}
                  className={`${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  // disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DispatchManagementListApp;
