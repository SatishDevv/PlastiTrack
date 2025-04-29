import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { Badge } from "@/components/ui/badge";
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
import { AssignContainerModel } from "@/interface/assign.container";
import { fetchUserStockManagementRequest } from "@/store/action/assign.container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ChartLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux-saga";

const UserStockListApp = () => {
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  const [Search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUserStock, setFilteredUserStock] = useState<AssignContainerModel[]>([]);

  const userStock =
    useSelector((x: AppState) => x.assignmentContainer.list) || [];

  useEffect(() => {
    dispatch(fetchUserStockManagementRequest());
  }, []);

  useEffect(() => {
    const filteredData = userStock?.result?.filter((item: any) =>
      item.containerName?.toLowerCase().includes(Search.toLowerCase())
    );
    setFilteredUserStock(filteredData ?? []);
  }, [Search, userStock]);
  
  return (
    <div className="p-6 bg-white  rounded-2xl shadow-md">
       <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            <ChartLine size={20} />
          </div>
          <span className="text-md font-semibold">User Stock</span>
        </div>
        {currentPage === 1 && (
          <Input
            // value={}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            placeholder="Search Container..."
            className="w-72"
          />
        )}
      </div>

      <Separator className="m-4" />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 text-gray-700">
              <TableHead className="px-4 py-2 text-left font-semibold">
                Container Name
              </TableHead>
              <TableHead className="px-4 py-2 text-left font-semibold">
                User Name
              </TableHead>
              <TableHead className="px-4 py-2 text-left font-semibold">
                Stock Quantity
              </TableHead>
              <TableHead className="px-4 py-2 text-left font-semibold">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUserStock?.length > 0 ? (
              filteredUserStock?.map((item: any, index: number) => (
                <TableRow key={index} className="hover:bg-gray-50 transition">
                  <TableCell className="px-4 py-3 font-medium text-gray-900">
                    {item?.containerName || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700">
                    {item?.firstName || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700">
                    <Badge className="bg-blue-500 hover:bg-blue-400">
                      {" "}
                      {item?.stockQty ?? "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700">
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
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
  );
};

export default UserStockListApp;
