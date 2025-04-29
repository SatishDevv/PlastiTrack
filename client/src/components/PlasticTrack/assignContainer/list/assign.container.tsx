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
import { AppState } from "@/store/reducer/root.reducer";
import {
  Boxes
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchAllotContainerRequest } from "@/store/action/allot.assignments.action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

const AddAssignmentContainer = () => {
  const pageSize = 10;

  //mention hooks

  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors

  const assignmentList =
    useSelector((state: AppState) => state.allotAssignments) || [];

  const userId = useSelector((x: AppState) => x.auth.result?._id);

  //mention states

  const [searchTransactionId, setSearchTransactionId] = useState("");
  const [searchContainerName, setSearchContainerName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

    // Data fetching

  useEffect(() => {
    if (!userId) return;

    dispatch(fetchAllotContainerRequest(userId));
  }, [userId]);

  // Total pages for pagination
  const totalPages = Math.ceil(
    (assignmentList?.view?.result?.length || 0) / pageSize
  );

  // Filtered data based on search
  const filteredList =
    assignmentList?.view.result?.filter((item: any) => {
      const transMatch = item?.transactionId
        ?.toLowerCase()
        .includes(searchTransactionId.toLowerCase());
      const containerMatch = item?.containerName
        ?.toLowerCase()
        .includes(searchContainerName.toLowerCase());
      const userMatch = item?.toUser
        ?.toLowerCase()
        .includes(searchUsername.toLowerCase());

      return transMatch && containerMatch && userMatch;
    }) || [];

  const handleGenerateQR = async (_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/assignAssignment/generateQr/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success && data.data.qrCodeUrl) {
        alert("QR Code generated successfully!");

        // Update the item with new qrCodeUrl
        assignmentList.view.result = assignmentList?.view?.result?.map(
          (item: any) =>
            item._id === _id ? { ...item, qrCode: data.data.qrCode } : item
        );

        setOpenDialogId(_id);
      } else {
        // alert("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR Code:", error);
      alert("Something went wrong while generating QR code.");
    }
  };

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <Boxes size={22} />
            </div>
            <span className="text-md font-semibold">Allot To</span>
          </div>
          {currentPage === 1 && (
            <div className="flex flex-col md:flex-row gap-4 mt-4 items-start md:items-center">
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

        {currentPage === 1 && (
          <div className="flex items-center justify-end mt-2">
            {/* <h2 className="text-sm font-semibold">LIST OF ALLOTED CONTAINER</h2> */}
            <div className="flex gap-4">
              <Link to={`${ROUTE_URL.ASSIGNCONTAINER.ADD}`}>
                <Button type="button" className="btn btn-primary btn-sm">
                  <i className="bi bi-plus-lg"></i> Allot Container
                </Button>
              </Link>
            </div>
          </div>
        )}

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                To User
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Transaction ID
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Container
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Quantity
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Created On
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Action Type
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Status
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
                      {item?.toUser}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-medium">
                      {item?.transactionId}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-medium">
                      {item?.containerName}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {item?.quantity || "---"}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "---"}
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
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item?.status === "Pending Dispatch"
                              ? "bg-red-200 text-red-800  hover:bg-red-300"
                              : item?.status === "Dispatched"
                              ? "bg-orange-200 text-orange-800  hover:bg-orange-300"
                              : item?.status === "Received"
                              ? "bg-green-200 text-green-800  hover:bg-green-300"
                              : "bg-gray-200 text-gray-800  hover:bg-gray-500"
                          }
                        >
                          {item?.status || "---"}
                        </Badge>
                      </TableCell>
                    </TableCell>

                    <TableCell className="flex items-center px-4 py-3 gap-4">
                      {item.status === "Dispatched" ? (
                        <Button
                          onClick={async () => {
                            await handleGenerateQR(item._id); // Your API call
                            setOpenDialogId(item._id); // Open dialog for this item
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-neumorph transition duration-200 ease-in-out"
                        >
                          Generate QR
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed"
                        >
                          Generate QR
                        </Button>
                      )}

                      <AlertDialog
                        open={openDialogId === item._id}
                        onOpenChange={(open) => {
                          if (!open) setOpenDialogId(null);
                        }}
                      >
                        <AlertDialogContent className="max-w-lg bg-white rounded-lg p-6 shadow-neumorph">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-medium text-gray-900">
                              Transaction Details
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-500 mt-1">
                              <strong className="text-blue-600">
                                {item?.transactionId}
                              </strong>
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          {/* Info Display */}
                          <div className="mt-6 space-y-3 text-sm text-gray-700">
                            <div>
                              <span className="font-medium text-gray-800">
                                Container Name:
                              </span>{" "}
                              {item?.containerName}
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">
                                Container Type:
                              </span>{" "}
                              {item?.containerType}
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">
                                To User:
                              </span>{" "}
                              {item?.toUser}
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">
                                Quantity:
                              </span>{" "}
                              {item?.quantity}
                            </div>

                            {/* QR Code Section */}
                            <div className="flex flex-col items-center justify-center space-y-4">
                              {item.qrCode ? (
                                <div className="bg-gray-100 p-6 rounded-xl shadow-neumorph">
                                  <img
                                    src={item?.qrCode}
                                    alt="QR Code"
                                    className="w-36 h-36 object-contain rounded-md"
                                  />
                                  <a
                                    href={item.qrCode}
                                    download={`QR_Code_${item.transactionId}.png`}
                                    className="mt-3 text-blue-600 hover:text-blue-700 text-sm"
                                  >
                                    Download QR Code
                                  </a>
                                </div>
                              ) : (
                                <p className="text-red-500 italic">
                                  QR Code not available
                                </p>
                              )}
                            </div>
                          </div>

                          <AlertDialogFooter className="mt-6">
                            <AlertDialogCancel
                              onClick={() => setOpenDialogId(null)}
                              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
                            >
                              Close
                            </AlertDialogCancel>
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
        <div className="sticky bottom-0 left-0 w-full  shadow-md py-3">
          <Pagination className="flex justify-center">
            <PaginationContent className="flex">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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

export default AddAssignmentContainer;
