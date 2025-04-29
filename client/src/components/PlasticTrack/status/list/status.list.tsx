import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ROUTE_URL } from "@/constant/routes.const";
import { Trash2 } from "lucide-react";
import { deleteStatusRequest, fetchStatusRequest, resetDeleteStatus } from "@/store/action/status.action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { ChartNoAxesCombined, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AppState } from "@/store/reducer/root.reducer";
import { AnyAction } from "redux-saga";
import { IStatusModel } from "@/interface/status.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { toast } from "react-toastify";

const StatusListApp = () => {
  const pageSize = 10;

  //mention hooks
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors
  const status = useSelector((x: AppState) => x?.status) || [];

  //mention states

  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStatus, setFilteredStatus] = useState<IStatusModel[]>([]);
 
  //   statusCode: "",
  //   type: "",
  //   Fields: "",
  //   OrderBy: "",
  //   PageSize: pageSize,
  //   Skip: 0,
  //   SearchQuery: "",
  // });

  // Data fetching
  useEffect(() => {
    console.log("API FETCH useEffect triggered");

    dispatch(
      fetchStatusRequest()
    );
  }, [dispatch]);

  // Filter logic
  useEffect(() => {
    const filteredData = status?.list.result?.filter((item) =>
      item.statusType.toLowerCase().includes(Search.toLowerCase())
    ) || [];
    setFilteredStatus(filteredData);
  }, [Search, status]);

  // Pagination Logic
  const paginatedData = filteredStatus.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

    useEffect(() => {
      if (status.delete?.result) {
        // Or role.deleteMessage if you’re using that
        dispatch(fetchStatusRequest());
        dispatch(resetDeleteStatus());
        toast.success("Status deleted successfully");
  
      }
    }, [status.delete.result, dispatch]);

      const handleDelete = (_id: string = "") => {
        dispatch(deleteStatusRequest(_id));
      };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <ChartNoAxesCombined size={20} strokeWidth={3} />
            </div>
            <span className="text-md font-semibold">Status</span>
          </div>
          {currentPage === 1 && (
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
              placeholder="Search Status..."
              className="w-72"
            />
          )}
        </div>
        <Separator className="mt-4" />
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">LIST OF STATUS</h2>
          {currentPage === 1 && (
            <div className="flex gap-4">
              <Link to={`${ROUTE_URL.STATUS.ADD}`}>
                <Button type="button" className="btn btn-primary btn-sm">
                  <i className="bi bi-plus-lg"></i>Create new status
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Status Type
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Status Code
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {/* {status?.delete?.error &&
                  status?.delete?.error?.map((error: string) => (
                    <MessagesApp
                      type="alert-danger"
                      message={error}
                      close={closeError}
                      key={error}
                    />
                  ))} */}
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="px-4 py-3 font-medium">
                    {item.statusType}
                  </TableCell>
                  <TableCell className="px-4 py-3">{item.statusCode}</TableCell>
                  <TableCell className="flex px-4 py-3">
                    <Link
                      to={`${ROUTE_URL.STATUS.LIST}/${item._id}`}
                      className="mr-4"
                    >
                      <Pencil size={20} strokeWidth={2.25} />
                    </Link>
                    {/* <Link to={`${ROUTE_URL.STATUS}/${item._id}`}> */}
                    <Trash2
                      size={20}
                      strokeWidth={2.25}
                      onClick={() => handleDelete(item._id)}
                    />                    {/* </Link> */}
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
      {filteredStatus.length > 0 && (
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
              {[...Array(Math.ceil(filteredStatus.length / pageSize))].map(
                (_, i) => (
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
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  // disabled={
                  //   currentPage === Math.ceil(filteredStatus.length / pageSize)
                  // }
                  className={`${
                    currentPage === Math.ceil(filteredStatus.length / pageSize)
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

export default StatusListApp;
