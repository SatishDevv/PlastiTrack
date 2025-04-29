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
import { fetchContainerTransactionRequest } from "@/store/action/assign.container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ChartNoAxesCombined, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Fixed: use 'react-router-dom'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

const TransactionListApp = () => {
  
  const pageSize = 10;

  //mention hooks

  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  // mention selectors
  const transaction = useSelector(
    (x: AppState) => x.assignmentContainer.list.result
  );


  //mention states

  const [search, setSearch] = useState<string>(""); // Added search state
  const [currentPage, setCurrentPage] = useState(1);
  
  
  // Fetch transactions whenever filter or page changes
  useEffect(() => {
    dispatch(
      fetchContainerTransactionRequest({ Skip: (currentPage - 1) * pageSize,})
    );
  }, [ dispatch, currentPage, search]);

  // Filter transactions based on search input
  const filteredTransactions = transaction?.filter(
    (item) =>
      item.transactionId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.createdAt?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil((filteredTransactions?.length || 0) / pageSize);

  return (
    <div>
      <div className="relative min-h-screen flex flex-col">
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                <ChartNoAxesCombined size={20} strokeWidth={3} />
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
          </div>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 text-left  text-sm font-semibold ">
                  Transaction Name
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                  Created Date
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions?.length || 0 > 0 ? (
                filteredTransactions?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((item, index) => (
                    <TableRow
                    key={index}
                    className={`border-b ${!item.isActive ? "bg-green-100" : ""}`}
                  >
                    <TableCell className="px-4 py-3">
                      {item.transactionId || "No Name"}
                      {!item.isActive && (
                        <span className="ml-2 text-xs text-green-700 bg-green-200 rounded-full px-2 py-0.5">
                          Completed
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3" typeof="date">
                      {item?.createdAt
                        ? new Date(item.createdAt).toISOString().slice(0, 10)
                        : "No Date"}
                    </TableCell>
                    <TableCell className="flex px-4 py-3">
                      <Link
                        to={`${ROUTE_URL.TRANSACTION.LIST}/${item?._id}`}
                        className="mr-4"
                      >
                        <Eye size={20} strokeWidth={2.25} />
                      </Link>
                    </TableCell>
                  </TableRow>
                  
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-3">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredTransactions?.length || 0 > 0 && (
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

              <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>

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

export default TransactionListApp;
