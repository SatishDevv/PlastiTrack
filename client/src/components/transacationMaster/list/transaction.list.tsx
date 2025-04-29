import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
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
  deleteTransactionMasterRequest,
  fetchTransactionMasterRequest,
} from "@/store/action/transaction.master.action";
import { AppState } from "@/store/reducer/root.reducer";
import {
  ChartNoAxesCombined,
  Edit,
  FileCheck,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

const TransactionMasterListApp = () => {
  const pageSize =5;

  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  const transaction = useSelector((x: AppState) => x.transaction);
  const [search, setSearch] = useState<string>(""); // Added search state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchTransactionMasterRequest()
    );
  }, [dispatch, search]);

  const filteredTransactions =
    transaction?.list?.result?.filter(
      (item) =>
        item?.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
        item.createdAt?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleDelete = (id: string = "") => {
    if (transaction?.delete?.error || transaction?.delete.error?.length === 0 ) {
      toast("This transaction is already Allocated");
    } else {
      dispatch(deleteTransactionMasterRequest(id));
    }
    dispatch(deleteTransactionMasterRequest(id));
  };

  const totalPages = Math.ceil((filteredTransactions?.length || 0) / pageSize);

  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col">
          <div className="p-4 flex-grow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  <FileCheck size={20} strokeWidth={3} />
                </div>
                <span className="text-md font-semibold">Transactions</span>
              </div>
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                placeholder="Search Transaction..."
                className="w-72"
              />
            </div>
            <Separator className="mt-4" />

            <div className="flex items-center justify-between mt-2">
              <h2 className="text-sm font-semibold">LIST OF TRANSACTIONS</h2>
              {currentPage === 1 && (
                <div className="flex gap-4">
                  <Link to={`${ROUTE_URL.TRANSACTION_MASTER.ADD}`}>
                    <Button type="button" className="btn btn-primary btn-sm">
                      <i className="bi bi-plus-lg"></i> <Plus />
                      Add
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2 text-left  text-sm font-semibold ">
                    Transaction ID
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left  text-sm font-semibold ">
                    InStock
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                    Created Date
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                    Completed On
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions?.length > 0 ? (
                  filteredTransactions
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        // className={`border-b ${
                        //   !item.isActive ? "bg-green-100" : ""
                        // }`}
                      >
                        <TableCell className="px-4 py-3">
                          {item.transactionId || "---"}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {item.totalQuantity || "---"}
                        </TableCell>
                        <TableCell className="px-4 py-3" typeof="date">
                          {item?.createdAt
                            ? new Date(item.createdAt)
                                .toISOString()
                                .slice(0, 10)
                            : "No Date"}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <Badge
                            className={
                              item?.status === "Pending"
                                ? "bg-red-200 text-red-800  hover:bg-red-300"
                                : item?.status === "Dispatched"
                                ? "bg-orange-200 text-orange-800 hover:orange-300"
                                : ""
                            }
                          >
                            {" "}
                            {item?.status || "---"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {item?.completedOn || "---"}
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
                                      : `${ROUTE_URL.TRANSACTION_MASTER.LIST}/${item?._id}`
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
                                  if (!item.isAssigned)
                                    handleDelete(item._id || "");
                                }}
                              >
                                <span className="flex items-center gap-2">
                                  <ChartNoAxesCombined
                                    size={16}
                                    strokeWidth={2}
                                  />
                                  Delete
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
        </div>

        {filteredTransactions?.length > 0 && (
          <div className="sticky bottom-0 left-0 w-full border-gray-300 shadow-md py-3">
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

                <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>

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
    </div>
  );
};

export default TransactionMasterListApp;
