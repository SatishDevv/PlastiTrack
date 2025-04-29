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
import { ITrackFlowModel } from "@/interface/trackflow";
import { fetchTrackFlowStatusRequest } from "@/store/action/trackFlow.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Workflow } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux-saga";

const TrackFlowStatusListApp = () => {
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  const trackFlow = useSelector((x: AppState) => x.trackFlow.list);

  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTrackFLow, setFilteredTrackFlow] = useState<
  ITrackFlowModel[]
  >([]);

  // Data fetching
  useEffect(() => {
    dispatch(fetchTrackFlowStatusRequest());
  }, []);

  // Filter logic
  useEffect(() => {
    const filteredData = trackFlow?.result?.filter((item: any) =>
      item.transactionId.toLowerCase().includes(Search.toLowerCase())
    ) || [];
    
    setFilteredTrackFlow(filteredData);
  }, [Search, trackFlow]);


  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            <Workflow size={20} />
          </div>
          <span className="text-md font-semibold">Track Flow Status</span>
        </div>
        {currentPage === 1 && (
          <Input
            // value={}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            placeholder="Search Transaction ID..."
            className="w-72"
          />
        )}
      </div>

      <Separator className="m-4" />
      <div className="rounded-2xl shadow overflow-hidden">
        <Table className="min-w-full bg-white">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-3 text-left font-semibold">
                Action
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold">
                Transaction ID
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold">
                Container Type
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold">
                Quantity
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold">
                Action Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrackFLow?.length > 0 ? (
              filteredTrackFLow?.map((item: any, index: number) => (
                <TableRow key={index} className="hover:bg-gray-50 transition">
                  <TableCell className="px-4 py-3">{item.action}</TableCell>
                  <TableCell className="px-4 py-3">
                    {item.transactionId}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {item.containerType}
                  </TableCell>
                  <TableCell className="px-4 py-3">{item.quantity}</TableCell>
                  <TableCell className="px-4 py-3">
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

export default TrackFlowStatusListApp;
